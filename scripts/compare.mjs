import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { toEventSelector } from "viem";
import { contract, defaults, positiveInteger } from "../config/contracts.mjs";
import { assertMainnet, blockNumber, quantity, rpcClient, RpcError } from "./rpc.mjs";
import { comparePosition, readGraphqlLogs, rowId } from "./logs-query.mjs";

const stackerAbi = JSON.parse(readFileSync(new URL("../abis/provenance/Stacker.json", import.meta.url), "utf8")).abi;
const stackedEvent = stackerAbi.find((entry) => entry.type === "event" && entry.name === "Stacked");
export const stackedTopic = toEventSelector(stackedEvent);

export function logFilters(env = process.env) {
  return Object.keys(defaults).map((name) => {
    const { address, startBlock } = contract(name, env);
    return {
      name, address, startBlock,
      ...(name === "Stacker" ? {
        topics: [stackedTopic, `0x${contract("PleaHook", env).address.slice(2).padStart(64, "0")}`],
      } : {}),
    };
  });
}

// Split refused ranges and potentially capped responses. Never silently accept a log cap.
export async function getLogs(rpc, filter, from, to, maxLogs, report) {
  try {
    const result = await rpc("eth_getLogs", [{ ...filter, fromBlock: quantity(from), toBlock: quantity(to) }]);
    if (!Array.isArray(result)) throw new Error("eth_getLogs did not return an array");
    if (result.length < maxLogs) return result;
    if (from === to) throw new Error(`Block ${from} reached COMPARE_RPC_LOG_LIMIT=${maxLogs}; completeness cannot be established`);
  } catch (error) {
    const rangeError = error instanceof RpcError &&
      (error.code === -32005 || /range|limit|too large|too many (logs|results)|exceed|response size/i.test(error.message));
    if (!rangeError || from === to) throw error;
  }
  const middle = (from + to) / 2n;
  report(`Splitting RPC log range ${from}-${to}`);
  const left = await getLogs(rpc, filter, from, middle, maxLogs, report);
  const right = await getLogs(rpc, filter, middle + 1n, to, maxLogs, report);
  return left.concat(right);
}

export async function readRpcLogs(rpc, from, to, { blockRange, maxLogs, report = console.log, env = process.env }) {
  const logs = new Map();
  for (const { name, startBlock, ...filter } of logFilters(env)) {
    const first = from > BigInt(startBlock) ? from : BigInt(startBlock);
    let count = 0;
    for (let start = first; start <= to; start += BigInt(blockRange)) {
      const end = start + BigInt(blockRange) - 1n < to ? start + BigInt(blockRange) - 1n : to;
      for (const log of await getLogs(rpc, filter, start, end, maxLogs, report)) {
        if (log.removed || log.blockNumber == null || log.transactionHash == null || log.logIndex == null) {
          throw new Error(`RPC returned removed or pending log for ${name}`);
        }
        if (BigInt(log.blockNumber) < start || BigInt(log.blockNumber) > end ||
            log.address.toLowerCase() !== filter.address ||
            filter.topics?.some((topic, i) => log.topics[i]?.toLowerCase() !== topic)) {
          throw new Error(`RPC returned a log outside the ${name} filter`);
        }
        const id = `${BigInt(log.blockNumber)}-${Number(BigInt(log.logIndex))}`;
        if (logs.has(id)) {
          if (JSON.stringify(logs.get(id)) !== JSON.stringify(log)) throw new Error(`Conflicting RPC log ${id}`);
        } else {
          logs.set(id, log);
        }
        count++;
      }
    }
    report(`RPC ${name}: ${count} logs`);
  }
  const blocks = new Map();
  const rows = [];
  for (const log of logs.values()) {
    if (!blocks.has(log.blockHash)) {
      const block = await rpc("eth_getBlockByHash", [log.blockHash, false]);
      if (!block || block.hash !== log.blockHash || BigInt(block.number) !== BigInt(log.blockNumber)) {
        throw new Error(`RPC block/log mismatch at ${log.blockNumber}`);
      }
      blocks.set(log.blockHash, block);
    }
    if (log.topics.length > 4) throw new Error("RPC returned more than four topics");
    const block = blocks.get(log.blockHash);
    rows.push({
      blockNumber: BigInt(log.blockNumber).toString(),
      blockHash: log.blockHash.toLowerCase(),
      blockTimestamp: BigInt(block.timestamp).toString(),
      transactionHash: log.transactionHash.toLowerCase(),
      transactionIndex: Number(BigInt(log.transactionIndex)),
      logIndex: Number(BigInt(log.logIndex)),
      address: log.address.toLowerCase(),
      topic0: log.topics[0]?.toLowerCase() ?? null,
      topic1: log.topics[1]?.toLowerCase() ?? null,
      topic2: log.topics[2]?.toLowerCase() ?? null,
      topic3: log.topics[3]?.toLowerCase() ?? null,
      data: log.data.toLowerCase(),
    });
  }
  return rows.sort(comparePosition);
}

export function differences(actual, expected) {
  const problems = [];
  if (actual.length !== expected.length) problems.push(`count: GraphQL=${actual.length}, RPC=${expected.length}`);
  const graphqlRows = new Map(actual.map((row) => [rowId(row), row]));
  const rpcRows = new Map(expected.map((row) => [rowId(row), row]));
  for (const [id, row] of rpcRows) {
    const found = graphqlRows.get(id);
    if (!found) { problems.push(`${id}: missing from GraphQL`); continue; }
    for (const [key, value] of Object.entries(row)) {
      if (found[key] !== value) problems.push(`${id}.${key}: GraphQL=${JSON.stringify(found[key])}, RPC=${JSON.stringify(value)}`);
    }
  }
  for (const id of graphqlRows.keys()) if (!rpcRows.has(id)) problems.push(`${id}: extra GraphQL log`);
  return problems;
}

export async function compare(graphqlUrl, rpcUrl, from, to, report = console.log) {
  if (from > to) throw new Error("from must be <= to");
  const blockRange = positiveInteger("COMPARE_BLOCK_RANGE", 500);
  const maxLogs = positiveInteger("COMPARE_RPC_LOG_LIMIT", 10000);
  const rpc = rpcClient(rpcUrl);
  await assertMainnet(rpc);
  const before = await rpc("eth_getBlockByNumber", [quantity(to), false]);
  if (!before) throw new Error(`RPC has no block ${to}`);
  report(`RPC chainId=1; range=${from}-${to}; filters=9; chunk=${blockRange}`);
  const { rows: actual, status, pages } = await readGraphqlLogs(graphqlUrl, from, to, report);
  const expected = await readRpcLogs(rpc, from, to, { blockRange, maxLogs, report });
  const after = await rpc("eth_getBlockByNumber", [quantity(to), false]);
  if (before.hash !== after?.hash) throw new Error("Chain reorganized during comparison; rerun on a finalized range");
  const problems = differences(actual, expected);
  if (problems.length) throw new Error(`${problems.length} differences:\n${problems.slice(0, 20).join("\n")}`);
  report(`_meta.status: ${JSON.stringify(status)}`);
  report(`MATCH: ${actual.length} logs; all 12 queried fields equal; ${pages} GraphQL page(s); numeric (blockNumber, logIndex) order.`);
  return { rows: actual, status, pages };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const args = process.argv.slice(2);
    if (args.length !== 4) throw new Error("Usage: node scripts/compare.mjs <graphql url> <rpc url> <from> <to>");
    await compare(args[0], args[1], blockNumber(args[2], "from"), blockNumber(args[3], "to"));
  } catch (error) {
    console.error(`FAIL: ${error.message}`);
    process.exitCode = 1;
  }
}
