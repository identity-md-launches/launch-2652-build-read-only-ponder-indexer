import { chain, contract, defaults, rpcUrl } from "../config/contracts.mjs";
import { assertMainnet, quantity, rpcClient } from "./rpc.mjs";

try {
  const atStart = process.argv.includes("--at-start");
  const rpc = rpcClient(rpcUrl());
  await assertMainnet(rpc);
  const head = BigInt(await rpc("eth_blockNumber", []));
  console.log(`Chain ${chain.name}: id=1, head=${head}`);
  for (const name of Object.keys(defaults)) {
    const { address, startBlock } = contract(name);
    if (BigInt(startBlock) > head) throw new Error(`${name}: start block ${startBlock} is above head ${head}`);
    const latest = await rpc("eth_getCode", [address, "latest"]);
    if (!/^0x(?:[0-9a-fA-F]{2})+$/.test(latest)) throw new Error(`${name}: no code at latest`);
    let suffix = "";
    if (atStart) {
      const start = await rpc("eth_getCode", [address, quantity(startBlock)]);
      if (!/^0x(?:[0-9a-fA-F]{2})+$/.test(start)) throw new Error(`${name}: no code at start block ${startBlock}`);
      suffix = `, startCode=${(start.length - 2) / 2} bytes`;
    }
    console.log(`${name} ${address}: code=${(latest.length - 2) / 2} bytes, start=${startBlock}${suffix}`);
  }
  console.log(`PASS: chain ID 1 and code at all nine addresses (${atStart ? "latest and start block" : "latest"}).`);
} catch (error) {
  console.error(`FAIL: ${error.message}`);
  process.exitCode = 1;
}
