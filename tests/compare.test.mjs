import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { differences, getLogs } from "../scripts/compare.mjs";
import { RpcError } from "../scripts/rpc.mjs";
import { readGraphqlLogs } from "../scripts/logs-query.mjs";

test("comparator detects every changed field, extra rows, and missing rows", () => {
  const expected = {
    blockNumber: "26294150", blockHash: "0xab", blockTimestamp: "1793225400",
    transactionHash: "0xcd", transactionIndex: 1, logIndex: 2, address: "0xef",
    topic0: "0x12", topic1: "0x34", topic2: "0x56", topic3: null, data: "0x78",
  };
  assert.deepEqual(differences([expected], [expected]), []);
  for (const key of Object.keys(expected)) {
    const changed = { ...expected, [key]: typeof expected[key] === "number" ? 3 : "different" };
    assert.ok(differences([changed], [expected]).length > 0, key);
  }
  assert.ok(differences([], [expected]).some((value) => value.includes("missing")));
  assert.ok(differences([expected], []).some((value) => value.includes("extra")));
});

test("RPC refused ranges split inclusively without gaps, and single-block truncation fails", async () => {
  const requests = [];
  const rpc = async (_, [filter]) => {
    const from = BigInt(filter.fromBlock), to = BigInt(filter.toBlock);
    requests.push([from, to]);
    if (to - from > 1n) throw new RpcError("eth_getLogs", -32005, "block range limit");
    return Array.from({ length: Number(to - from + 1n) }, (_, i) => ({ blockNumber: from + BigInt(i) }));
  };
  const result = await getLogs(rpc, { address: "fixture" }, 1n, 7n, 100, () => {});
  assert.deepEqual(result.map((row) => row.blockNumber), [1n, 2n, 3n, 4n, 5n, 6n, 7n]);
  await assert.rejects(() => getLogs(async () => [1, 2], {}, 1n, 1n, 2, () => {}), /completeness/);
  await assert.rejects(() => getLogs(async () => { throw new RpcError("eth_getLogs", -32601, "method missing"); }, {}, 1n, 7n, 100, () => {}), /method missing/);
});

async function graphqlFixture(handler, run) {
  const server = createServer(async (request, response) => {
    let data = "";
    for await (const chunk of request) data += chunk;
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(handler(JSON.parse(data))));
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  try { await run(`http://127.0.0.1:${server.address().port}/graphql`); }
  finally { await new Promise((resolve) => { server.close(resolve); server.closeAllConnections(); }); }
}

test("GraphQL errors and a checkpoint behind the range cannot pass as an empty match", async () => {
  await graphqlFixture(() => ({ errors: [{ message: "invalid query" }] }), async (url) => {
    await assert.rejects(() => readGraphqlLogs(url, 10n, 20n), /GraphQL errors/);
  });
  await graphqlFixture(() => ({ data: {
    rawLogs: { items: [], pageInfo: { hasNextPage: false, endCursor: null } },
    _meta: { status: { mainnet: { id: 1, block: { number: 19, timestamp: 1000 } } } },
  } }), async (url) => {
    await assert.rejects(() => readGraphqlLogs(url, 10n, 20n), /only at 19/);
  });
});

test("GraphQL repeated cursors fail instead of looping forever", async () => {
  let page = 0;
  await graphqlFixture(({ variables }) => {
    assert.equal(typeof variables.from, "string");
    assert.equal(typeof variables.to, "string");
    return { data: {
      rawLogs: { items: [{ blockNumber: "10", blockTimestamp: "1000", logIndex: ++page, transactionIndex: 0 }], pageInfo: { hasNextPage: true, endCursor: "same" } },
      _meta: { status: { mainnet: { id: 1, block: { number: 20, timestamp: 1000 } } } },
    } };
  }, async (url) => {
    await assert.rejects(() => readGraphqlLogs(url, 10n, 20n, () => {}), /did not advance/);
  });
});
