// Synthetic read-only chain used only by the integration test; no real RPC calls.
import { createServer } from "node:http";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { encodeAbiParameters, encodeEventTopics } from "viem";
import { defaults } from "../config/contracts.mjs";

export const DATA_BLOCK = 26294150;
const HEAD = DATA_BLOCK + 40;
const hex = (value) => `0x${BigInt(value).toString(16)}`;
const hash = (text) => `0x${createHash("sha256").update(`SYNTHETIC:${text}`).digest("hex")}`;
const transactionHash = hash("transaction");
const timestamp = (number) => 1793225000 + (number - DATA_BLOCK) * 12;

function value(input) {
  if (input.type === "address") return defaults.PLEA.address;
  if (/^u?int/.test(input.type)) return 7n;
  if (input.type === "bool") return true;
  if (input.type === "string") return "Synthetic name — UTF-8";
  if (input.type === "bytes32") return hash("event bytes");
  throw new Error(`Fixture needs an encoder for ${input.type}`);
}

export function fixtureLogs() {
  const logs = [];
  function append(name, event, overrides = {}) {
    const args = Object.fromEntries(event.inputs.map((input) => [input.name, value(input)]));
    Object.assign(args, overrides);
    const nonIndexed = event.inputs.filter((input) => !input.indexed);
    logs.push({
      address: defaults[name].address,
      blockHash: hash(`block:${DATA_BLOCK}`),
      blockNumber: hex(DATA_BLOCK),
      transactionHash,
      transactionIndex: "0x0",
      logIndex: hex(logs.length),
      removed: false,
      topics: encodeEventTopics({ abi: [event], eventName: event.name, args }),
      data: encodeAbiParameters(nonIndexed, nonIndexed.map((input) => args[input.name])),
    });
  }
  let transfer;
  let stacked;
  for (const name of Object.keys(defaults)) {
    const { abi } = JSON.parse(readFileSync(new URL(`../abis/provenance/${name}.json`, import.meta.url), "utf8"));
    for (const event of abi.filter((entry) => entry.type === "event")) {
      append(name, event, name === "Stacker" ? { project: defaults.PleaHook.address } : {});
      if (name === "PLEA" && event.name === "Transfer") transfer = event;
      if (name === "Stacker") stacked = event;
    }
  }
  // Valid event for a different project: the topic1 filter must exclude it.
  append("Stacker", stacked, { project: defaults.PLEA.address });
  while (logs.length < 2006) append("PLEA", transfer);
  return logs;
}

export async function startFixtureRpc() {
  const logs = fixtureLogs();
  const hashes = new Map();
  const methods = new Set();
  function block(number, full) {
    hashes.set(hash(`block:${number}`), number);
    const tx = {
      hash: transactionHash, blockHash: hash(`block:${number}`), blockNumber: hex(number),
      transactionIndex: "0x0", from: defaults.PLEA.address, to: defaults.CabalGate.address,
      gas: "0x1c9c380", gasPrice: "0x1", input: "0x", nonce: "0x0", value: "0x0",
      type: "0x0", v: "0x1b", r: hash("r"), s: hash("s"), chainId: "0x1",
    };
    return {
      number: hex(number), hash: hash(`block:${number}`), parentHash: hash(`block:${number - 1}`),
      timestamp: hex(timestamp(number)), baseFeePerGas: "0x1", difficulty: "0x0", totalDifficulty: "0x0",
      extraData: "0x", gasLimit: "0x3938700", gasUsed: "0x1c9c380", logsBloom: `0x${"ff".repeat(256)}`,
      miner: defaults.PLEA.address, mixHash: hash("mix"), nonce: "0x0000000000000000",
      receiptsRoot: hash("receipts"), sha3Uncles: hash("uncles"), size: "0x1000",
      stateRoot: hash("state"), transactionsRoot: hash("transactions"), uncles: [],
      transactions: number === DATA_BLOCK ? [full ? tx : tx.hash] : [],
    };
  }
  for (let n = 26293889; n <= HEAD; n++) hashes.set(hash(`block:${n}`), n);
  function dispatch(method, params) {
    methods.add(method);
    if (method === "eth_chainId") return "0x1";
    if (method === "eth_blockNumber") return hex(HEAD);
    if (method === "eth_getCode") return "0x60006000";
    if (method === "eth_getBlockByNumber") {
      const number = ["latest", "pending"].includes(params[0]) ? HEAD :
        ["safe", "finalized"].includes(params[0]) ? HEAD - 20 : Number(BigInt(params[0]));
      return number > HEAD ? null : block(number, params[1]);
    }
    if (method === "eth_getBlockByHash") {
      const number = hashes.get(params[0]);
      return number === undefined ? null : block(number, params[1]);
    }
    if (method === "eth_getLogs") {
      const filter = params[0];
      return logs.filter((log) => {
        if (filter.blockHash && log.blockHash !== filter.blockHash) return false;
        if (filter.fromBlock && BigInt(log.blockNumber) < BigInt(filter.fromBlock)) return false;
        if (filter.toBlock && BigInt(log.blockNumber) > BigInt(filter.toBlock)) return false;
        const addresses = Array.isArray(filter.address) ? filter.address : filter.address ? [filter.address] : null;
        if (addresses && !addresses.some((a) => a.toLowerCase() === log.address)) return false;
        return (filter.topics ?? []).every((topic, i) => topic === null ||
          (Array.isArray(topic) ? topic : [topic]).some((t) => t.toLowerCase() === log.topics[i]?.toLowerCase()));
      });
    }
    throw new Error(`Unsupported synthetic RPC method ${method}`);
  }
  const server = createServer(async (request, response) => {
    let body = "";
    for await (const part of request) body += part;
    const payload = JSON.parse(body);
    const handle = ({ id, method, params }) => {
      try { return { jsonrpc: "2.0", id, result: dispatch(method, params) }; }
      catch (error) { return { jsonrpc: "2.0", id, error: { code: -32601, message: error.message } }; }
    };
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(Array.isArray(payload) ? payload.map(handle) : handle(payload)));
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  return {
    url: `http://127.0.0.1:${server.address().port}`,
    logs,
    methods,
    close: () => new Promise((resolve) => { server.close(resolve); server.closeAllConnections(); }),
  };
}
