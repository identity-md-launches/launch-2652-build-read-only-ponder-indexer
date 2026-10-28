import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { cp, mkdtemp, symlink, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createServer } from "node:net";
import { startFixtureRpc, DATA_BLOCK } from "./fixture-rpc.mjs";
import { compare } from "../scripts/compare.mjs";
import { LOGS_QUERY } from "../scripts/logs-query.mjs";
import { defaults } from "../config/contracts.mjs";
import { pause } from "../scripts/rpc.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const ponderBin = fileURLToPath(new URL("./bin/ponder.js", import.meta.resolve("ponder")));

async function freePort() {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const port = server.address().port;
  await new Promise((resolve) => server.close(resolve));
  return port;
}

test("actual Ponder: all 57 events, 2,005 rows, three GraphQL pages, CORS, SQL, restart", { timeout: 120_000 }, async () => {
  const rpc = await startFixtureRpc();
  const directory = await mkdtemp(join(tmpdir(), "plea-integration-"));
  const port = await freePort();
  const url = `http://127.0.0.1:${port}`;
  let child;
  let output = "";
  let exited;
  // Copy only application files, never production data or environment files.
  try {
    for (const name of ["package.json", "ponder.config.ts", "ponder.schema.ts", "ponder-env.d.ts", "tsconfig.json", "src", "abis", "config"]) {
      await cp(join(root, name), join(directory, name), { recursive: true });
    }
    await symlink(join(root, "node_modules"), join(directory, "node_modules"), "dir");
    function start() {
      const env = { ...process.env, PONDER_RPC_URL_1: rpc.url, PONDER_RPC_REQUESTS_PER_SECOND: "1000", PONDER_POLLING_INTERVAL: "1000" };
      // Tests cannot attach to a real PostgreSQL database or change the deployment fixture.
      for (const key of ["DATABASE_URL", "DATABASE_PRIVATE_URL", "DATABASE_SCHEMA", "RAILWAY_DEPLOYMENT_ID"]) delete env[key];
      for (const entry of Object.values(defaults)) {
        delete env[`${entry.env}_ADDRESS`];
        delete env[`${entry.env}_START_BLOCK`];
      }
      child = spawn(process.execPath, [ponderBin, "start", "--schema", "fixture", "--port", String(port), "--hostname", "127.0.0.1"], {
        cwd: directory, env, stdio: ["ignore", "pipe", "pipe"],
      });
      output = "";
      child.stdout.on("data", (data) => { output += data; });
      child.stderr.on("data", (data) => { output += data; });
      exited = new Promise((resolve) => child.once("exit", resolve));
    }
    async function ready() {
      for (let attempt = 0; attempt < 180; attempt++) {
        if (child.exitCode !== null) throw new Error(`Ponder exited: ${output}`);
        try {
          if ((await fetch(`${url}/ready`, { signal: AbortSignal.timeout(1000) })).ok) return;
        } catch {}
        await pause(250);
      }
      throw new Error(`Ponder did not become ready: ${output}`);
    }
    async function stop() {
      child.kill("SIGTERM");
      const deadline = setTimeout(() => child.kill("SIGKILL"), 8000);
      await exited;
      clearTimeout(deadline);
    }
    start();
    await ready();
    const messages = [];
    // Local RPC is fast; production comparison still uses the configured rate limit.
    const previousRps = process.env.PONDER_RPC_REQUESTS_PER_SECOND;
    process.env.PONDER_RPC_REQUESTS_PER_SECOND = "1000";
    let result;
    try { result = await compare(`${url}/graphql`, rpc.url, BigInt(DATA_BLOCK), BigInt(DATA_BLOCK), (line) => messages.push(line)); }
    finally {
      if (previousRps === undefined) delete process.env.PONDER_RPC_REQUESTS_PER_SECOND;
      else process.env.PONDER_RPC_REQUESTS_PER_SECOND = previousRps;
    }
    assert.equal(result.rows.length, 2005);
    assert.equal(result.pages, 3);
    assert.deepEqual(messages.filter((m) => m.startsWith("GraphQL page")), [
      "GraphQL page 1: 1000 rows; hasNextPage=true",
      "GraphQL page 2: 1000 rows; hasNextPage=true",
      "GraphQL page 3: 5 rows; hasNextPage=false",
    ]);
    assert.equal(result.rows.filter((r) => r.address === defaults.Stacker.address).length, 1);
    assert.ok(result.rows.some((r) => r.topic1 === null && r.data === "0x"));
    assert.ok(result.rows.some((r) => r.topic3 !== null));
    assert.equal(new Set(result.rows.map((r) => `${r.address}:${r.topic0}`)).size, 57);
    for (const origin of ["https://example.org", "https://another.example", "null"]) {
      const preflight = await fetch(`${url}/graphql`, { method: "OPTIONS", headers: {
        Origin: origin, "Access-Control-Request-Method": "POST", "Access-Control-Request-Headers": "content-type",
      } });
      assert.equal(preflight.status, 204);
      assert.equal(preflight.headers.get("access-control-allow-origin"), "*");
      assert.match(preflight.headers.get("access-control-allow-methods"), /POST/);
      assert.match(preflight.headers.get("access-control-allow-headers"), /content-type/i);
    }
    const page = await fetch(`${url}/graphql`, { method: "POST", headers: { "Content-Type": "application/json", Origin: "https://example.org" },
      body: JSON.stringify({ query: LOGS_QUERY, variables: { from: String(DATA_BLOCK), to: String(DATA_BLOCK), after: null } }),
    });
    assert.equal(page.headers.get("access-control-allow-origin"), "*");
    assert.equal((await page.json()).data.rawLogs.items.length, 1000);
    assert.equal((await fetch(`${url}/health`)).status, 200);
    assert.equal((await fetch(`${url}/ready`)).status, 200);

    // Ponder SQL protocol uses a SuperJSON envelope in the sql parameter.
    const sqlUrl = (sql) => `${url}/sql/db?sql=${encodeURIComponent(JSON.stringify({ json: { sql, params: [], typings: [] } }))}`;
    const sqlResponse = await fetch(sqlUrl('select count(*)::int as count from raw_log'));
    assert.equal(sqlResponse.status, 200);
    const sqlBody = await sqlResponse.json();
    assert.match(JSON.stringify(sqlBody), /2005/);
    const mutation = await fetch(sqlUrl("delete from raw_log"));
    assert.notEqual(mutation.status, 200);

    // Stop and resume the same database/schema: no missing or duplicated rows.
    await stop();
    start();
    await ready();
    const restarted = await (await fetch(sqlUrl('select count(*)::int as count from raw_log'))).json();
    assert.match(JSON.stringify(restarted), /2005/);
    assert.match(output, /cache contains all required data/);
    console.log(messages.join("\n"));
    console.log("PASS: 57 event types, topic1 exclusion, null/four topics, CORS, read-only SQL, restart persistence.");
  } finally {
    if (child && child.exitCode === null && child.signalCode === null) {
      child.kill("SIGTERM");
      const deadline = setTimeout(() => child.kill("SIGKILL"), 8000);
      await exited;
      clearTimeout(deadline);
    }
    await rpc.close();
    await rm(directory, { recursive: true, force: true });
  }
});
