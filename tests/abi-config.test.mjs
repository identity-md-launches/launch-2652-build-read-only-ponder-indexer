import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { contract, defaults, positiveInteger, rpcUrl } from "../config/contracts.mjs";
import { logFilters, stackedTopic } from "../scripts/compare.mjs";

const text = (path) => readFileSync(new URL(path, import.meta.url), "utf8");

test("all verified events have exactly one handler; ABIs equal saved Sourcify metadata", () => {
  const registrations = [...text("../src/index.ts").matchAll(/ponder\.on\("([^"]+)"/g)].map((match) => match[1]);
  const expected = [];
  for (const name of Object.keys(defaults)) {
    const record = JSON.parse(text(`../abis/provenance/${name}.json`));
    assert.equal(Number(record.chainId), 1);
    assert.equal(record.address.toLowerCase(), defaults[name].address);
    assert.equal(record.runtimeMatch, "match");
    assert.deepEqual(record.abi, record.metadata.output.abi);
    const literal = text(`../abis/${name}Abi.ts`).split(`export const ${name}Abi = `)[1].replace(/ as const;\s*$/, "");
    assert.deepEqual(JSON.parse(literal), record.abi);
    const events = record.abi.filter((entry) => entry.type === "event");
    for (const event of events) {
      assert.equal(event.anonymous, false);
      expected.push(`${name}:${event.name}`);
    }
  }
  assert.equal(expected.length, 57);
  assert.deepEqual(registrations.sort(), expected.sort());
  const schema = text("../ponder.schema.ts");
  assert.equal([...schema.matchAll(/onchainTable\(/g)].length, 1);
  assert.equal([...schema.matchAll(/t\.hex\(\),/g)].length, 4, "only the four topics may be nullable");
});

test("deployment overrides are validated and Stacker follows the hook override", () => {
  const env = { PLEA_HOOK_ADDRESS: defaults.PLEA.address.toUpperCase().replace("0X", "0x"), STACKER_START_BLOCK: "26295000" };
  const filter = logFilters(env).find((filter) => filter.name === "Stacker");
  assert.equal(filter.startBlock, 26295000);
  assert.deepEqual(filter.topics, [stackedTopic, `0x${defaults.PLEA.address.slice(2).padStart(64, "0")}`]);
  assert.throws(() => contract("PLEA", { PLEA_ADDRESS: "0x1234" }), /address/);
  assert.throws(() => contract("PLEA", { PLEA_START_BLOCK: "-1" }), /positive/);
  assert.throws(() => positiveInteger("RANGE", 500, { RANGE: "1.5" }), /integer/);
  assert.throws(() => rpcUrl({}), /PONDER_RPC_URL_1/);
  assert.throws(() => rpcUrl({ PONDER_RPC_URL_1: "file:///tmp/rpc" }), /HTTP/);
});
