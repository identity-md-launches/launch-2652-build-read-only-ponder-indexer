# PLEA raw-log indexer

A read-only **Ponder 0.18.1** project at the repository root, for **Ethereum mainnet (chain ID 1)**. It stores one application table, `raw_log`: every verified ABI event from the eight PLEA contracts, plus `Stacker.Stacked` where indexed `project` is PleaHook. The website supplies its own decoding. There are no balances, derived entities, transaction submissions, private keys, or contract writes.

The release includes the source, verified ABIs, pinned lockfile, Dockerfile and Compose configuration. This is source for a new public repository, to be reviewed and deployed by its owner; no hosted service is supplied. See [INDEXER.md](INDEXER.md) for the full deployment and event inventory and [checks/](checks/) for recorded results.

## Local development with PGlite

Use Node **22.12 or later** and **pnpm 10.28.2**. The worker checks used Node 26.11.1; the Dockerfile uses Node 22.22.0. Install pnpm with `npm install --global pnpm@10.28.2` if needed. Fresh installs and Docker builds require access to the npm registry. The lockfile fixes every dependency version and integrity hash, including optional platform binaries.

```sh
pnpm install --frozen-lockfile
pnpm codegen
pnpm typecheck
cp env.example .env.local
```

Edit `.env.local`: set `PONDER_RPC_URL_1` to a mainnet HTTP(S) RPC. Keep `DATABASE_PRIVATE_URL` and `DATABASE_URL` empty to select PGlite. Ponder loads `.env.local` automatically. Then:

```sh
node --env-file=.env.local scripts/verify-rpc.mjs
pnpm dev
```

Dependency archives and installed packages are excluded from this source release to meet its 8 MiB upload limit. Consequently, this release does **not** provide a self-contained offline install. For an offline deployment, prepare the Docker image on a connected machine and transfer the built image separately. Runtime indexing still requires an Ethereum RPC connection.

Visit `http://localhost:42069/graphql`. PGlite stores data in `.ponder/pglite`; preserve `.ponder/` to preserve the database and RPC cache. `ponder dev` can reset application data when files change. For a local persistence check without the development watcher, use `pnpm start --schema local_check` and restart the same command with unchanged configuration. PGlite is for local development; production uses PostgreSQL. `ponder serve` requires PostgreSQL.

## Query the raw logs of a block range

POST this exact query to `/graphql`:

```graphql
query Logs($from: BigInt!, $to: BigInt!, $after: String) {
  rawLogs(where: { blockNumber_gte: $from, blockNumber_lte: $to }, orderBy: "id", orderDirection: "asc", limit: 1000, after: $after) {
    items { blockNumber blockHash blockTimestamp transactionHash transactionIndex logIndex address topic0 topic1 topic2 topic3 data }
    pageInfo { hasNextPage endCursor }
  }
  _meta { status }
}
```

First-page variables are `{"from":"26293890","to":"26294150","after":null}`. **BigInt variables and returned BigInts are decimal strings.** Keep the range and ordering fixed, pass `endCursor` as `after`, and continue until `hasNextPage` is false. Do not stop merely because a page is shorter than expected.

`id` is exactly `<blockNumber>-<logIndex>`. Sorting that text ID is lexicographic, so concatenate all pages and sort numerically by `(blockNumber, logIndex)` when chronological order is needed. The provided reader and comparator do this. The inclusive example range contains exactly 13 logs; [example-logs.json](checks/example-logs.json) contains the observed rows.

`_meta.status` comes from Ponder's indexing checkpoint, including blocks with no matching logs. Its shape is:

```json
{"mainnet":{"id":1,"block":{"number":26294309,"timestamp":1793227547}}}
```

Those numbers are an observed checkpoint, not constants. Wait for the checkpoint to cover the requested range. Prefer finalized ranges for multi-page reads: live reorgs can change rows while paging; Ponder rolls back and replays affected logs automatically. The comparator checks the closing block hash before and after its scan.

For a shell request using the same query as the comparator:

```sh
node --input-type=module -e 'import { LOGS_QUERY } from "./scripts/logs-query.mjs"; console.log(JSON.stringify({query:LOGS_QUERY,variables:{from:"26293890",to:"26294150",after:null}}))' \
  | curl -sS http://localhost:42069/graphql -H 'Content-Type: application/json' --data-binary @-
```

CORS permits every origin, including preflight. Check it with:

```sh
curl -i -X OPTIONS http://localhost:42069/graphql \
  -H 'Origin: https://example.org' \
  -H 'Access-Control-Request-Method: POST' \
  -H 'Access-Control-Request-Headers: content-type'
```

Expected: HTTP 204 and `Access-Control-Allow-Origin: *`. `/health` is Ponder's process health endpoint; `/ready` returns 503 during backfill and 200 after catch-up. `/status` also exposes the indexed checkpoint. Readiness is a catch-up signal, not a guarantee that a public RPC remains responsive indefinitely; monitor checkpoint freshness too.

## SQL access

Ponder's read-only SQL-over-HTTP middleware is at `/sql/*`. A direct request using its SuperJSON envelope:

```sh
curl -sS --get http://localhost:42069/sql/db \
  --data-urlencode 'sql={"json":{"sql":"select * from raw_log where block_number between 26293890 and 26294150 order by block_number, log_index","params":[],"typings":[]}}'
```

SQL columns use snake_case; GraphQL uses camelCase. This route rejects writes. The normal client protocol is also supported by [`@ponder/client`](https://ponder.sh/docs/query/sql-over-http) in a consumer's own project. With production views enabled, a direct PostgreSQL reader can run:

```sql
SELECT * FROM plea.raw_log
WHERE block_number BETWEEN 26293890 AND 26294150
ORDER BY block_number, log_index;
```

Only `raw_log` is an application table. Ponder also manages its required internal checkpoint, reorg and RPC-cache tables. The fixed views schema contains views of the same data, not additional indexed entities.

## Configuration and RPC requirements

[env.example](env.example) documents every application/deployment setting. [config/contracts.mjs](config/contracts.mjs) is the shared manifest used by Ponder and the comparator. Every address and inclusive start block is overridable with the documented `<PREFIX>_ADDRESS` and `<PREFIX>_START_BLOCK`. The Stacker topic1 filter automatically follows `PLEA_HOOK_ADDRESS`. Chain ID 1 is deliberate: the exact requested primary key has no chain component, so changing this into a multi-chain indexer needs a schema/API design change.

The RPC URL is read **only** from `PONDER_RPC_URL_1`, with no hardcoded runtime fallback. The transport defaults to 4 requests/second, 500 blocks per log request, and a 12-second head poll. Adjust `PONDER_RPC_REQUESTS_PER_SECOND`, `PONDER_ETH_GET_LOGS_BLOCK_RANGE`, and `PONDER_POLLING_INTERVAL` for your provider. Blank overrides use the documented defaults; malformed addresses and nonpositive/unsafe block numbers fail configuration loading.

The RPC must support `eth_chainId`, `eth_blockNumber`, historical `eth_getLogs` from block 26293890, `eth_getBlockByNumber` (including full transactions), `eth_getBlockByHash`, and `eth_getCode` at latest for startup checks. Ponder's live sync also requests logs by `blockHash`, sometimes without address/topic filters; the endpoint must support that. Block bodies are needed for transaction indexes/hashes and timestamps. No traces, account keys, signing, or historical contract-state reads are used by indexing handlers. The optional `verify-rpc.mjs --at-start` additionally checks code at the configured start blocks and requires that historical state to be available.

Public endpoints from the supplied catalog include `https://rpc.flashbots.net/fast` and `https://one.valve.city/rpc/vk_demo/evm/1`. They are trial endpoints, not uptime guarantees. The first backfill succeeded on Flashbots; comparison and resume succeeded on Valve. Public endpoints returned throttling, stale-head and method-availability errors during these checks. Reduce request rate and log range, or select another endpoint after checking chain ID. For sustained production, supply your own suitable RPC through the environment; no provider credential is included here.

## Compare against Ethereum

With the server running and caught up:

```sh
node scripts/compare.mjs http://localhost:42069/graphql \
  https://one.valve.city/rpc/vk_demo/evm/1 26293890 26294150
```

CLI: `node scripts/compare.mjs <graphql url> <rpc url> <from> <to>`. It reads all GraphQL pages, sends **nine separate RPC filters**, clips each to its configured start block, fetches block timestamps, and compares all 12 queried fields for every row in numerical order. The eight PLEA address filters have no topic restriction, so missing event registrations are detected. Stacker has both the verified Stacked topic0 and PleaHook topic1. Use the same address/start overrides as the running indexer (export them, or pass Node's `--env-file` option).

`COMPARE_BLOCK_RANGE` sets the RPC chunk size (default 500). Refused ranges split recursively; `COMPARE_RPC_LOG_LIMIT` (default 10000) treats a response at that size as potentially truncated and splits it, failing if a single block hits the cap. Set this to your provider's documented result cap. An endpoint that silently omits arbitrary logs cannot be proven complete by its own responses. HTTP timeouts/retries are bounded. Wrong chains, GraphQL errors, stale checkpoints, duplicate rows, broken cursors, reorgs and any field/count difference exit nonzero.

Actual real-backfill output, abbreviated only by omitting the nine per-contract counts (full output in [checks/compare.txt](checks/compare.txt)):

```text
RPC chainId=1; range=26293890-26294150; filters=9; chunk=500
GraphQL page 1: 13 rows; hasNextPage=false
_meta.status: {"mainnet":{"id":1,"block":{"number":26294309,"timestamp":1793227547}}}
MATCH: 13 logs; all 12 queried fields equal; 1 GraphQL page(s); numeric (blockNumber, logIndex) order.
```

## Deploy with Docker Compose

These are operator instructions; no access to your server is needed for this source release. The Dockerfile installs from the pinned lockfile with `--frozen-lockfile`, retains TypeScript for Ponder startup, runs as the `node` user, and starts through [scripts/start.sh](scripts/start.sh). Building the image requires registry access; restarting an existing image does not reinstall packages.

1. Clone the released repository on your Docker host and enter its root. Run `cp env.example .env`. Set `PONDER_RPC_URL_1` and choose a long **URL-safe** `POSTGRES_PASSWORD` (letters/digits are suitable). Compose constructs the internal database URL from that password; use URL-safe characters to avoid URI escaping issues. Review contract overrides and `PONDER_VIEWS_SCHEMA`.
2. Run `docker compose up -d --build`. Run `docker compose logs -f indexer` to watch backfill, then `curl -i http://127.0.0.1:42069/ready`. The Docker readiness healthcheck allows a 3600-second initial backfill period, checks every 30 seconds with a 5-second timeout, and allows three failures afterward.
3. Postgres has **no published port**. The app is published only at `127.0.0.1:42069` (change `APP_PORT` if needed); `PORT` is its internal listening port. Put a host reverse proxy with HTTPS in front of it before sharing a URL. A Caddy site for a domain you control can use `reverse_proxy 127.0.0.1:42069` inside that domain's site block.
4. For a restart, use `docker compose restart indexer`. The unchanged image uses the same fixed deployment schema and resumes. Database data lives in the named `pgdata` volume; preserve and back it up. `docker compose down` preserves it; **`docker compose down -v` deletes it**. Do not delete `.build-id` inside an image or share a write schema between two indexers.
5. To deploy source changes, pull and run `docker compose up -d --build`. A changed source build gets a new schema ID. Compose stops the old container before the new one catches up, so the API has downtime during backfill.

The schema selection is `DATABASE_SCHEMA`, otherwise `RAILWAY_DEPLOYMENT_ID`, otherwise the image's generated `.build-id`. That ID is fixed for the lifetime of an image and passed explicitly as `--schema`; source rebuilds generate a new ID. When running production directly without Docker, set `DATABASE_URL`, `DATABASE_SCHEMA` and the RPC, install the pinned pnpm, then run `sh scripts/start.sh`. It refuses production startup without PostgreSQL or a unique schema.

**After changing addresses, start blocks, ABIs, handlers or the table definition, use a fresh schema.** For environment-only changes, set a new `DATABASE_SCHEMA` in `.env` and recreate the indexer, or rebuild with `docker compose build --no-cache indexer` and leave `DATABASE_SCHEMA` unset. If you manually pinned `DATABASE_SCHEMA`, change it on every such deployment. Keep it fixed for restarts of that deployment. Ponder can reuse its RPC cache while rebuilding application rows.

`PONDER_VIEWS_SCHEMA` defaults to `plea`. `--views-schema plea` updates stable SQL views when the deployment becomes ready. Set it to `off` to disable views, or to the write schema name to avoid creating a separate view schema. Each independent project needs its own views schema. Old write schemas remain until an operator prunes them.

## Deploy on Railway with PostgreSQL

1. Publish/fork this source as a **new public GitHub repository**. In Railway, create a project and select **Deploy from GitHub repo**. Select that repository. The root Dockerfile is detected; leave Root Directory at the repository root and do not add a custom start command.
2. Add a PostgreSQL service to the same project/region. In the indexer Variables screen, reference that service's private database connection as `DATABASE_URL` (or `DATABASE_PRIVATE_URL`, which takes precedence). Keep DB latency low; the DB user must be allowed to create schemas.
3. Set `PONDER_RPC_URL_1`, any contract overrides, `PONDER_VIEWS_SCHEMA=plea`, and `RAILWAY_HEALTHCHECK_TIMEOUT_SEC=3600`. Leave `DATABASE_SCHEMA` unset so the provided `RAILWAY_DEPLOYMENT_ID` selects a fresh schema per deployment. Railway supplies `PORT`; the app listens on `0.0.0.0` at that port.
4. Under deployment settings, set **Healthcheck Path** to `/ready`. Railway waits for backfill, up to the configured timeout, before moving traffic. If your historical backfill takes longer, adjust the platform's supported timeout/provider throughput; do not move the required start blocks forward just to pass readiness. Checking `/health` instead exposes partial data and changes the readiness guarantee.
5. Generate a public domain in Networking. Use `https://<your-domain>/graphql` and `/sql/db`. Keep Postgres on private networking. Railway deployment and billing remain the owner's actions; none were performed for this release.

No Railway config file overrides the Docker startup. See Ponder's [Railway guide](https://ponder.sh/docs/production/railway) and [self-hosting guide](https://ponder.sh/docs/production/self-hosting) for platform and schema behavior.

For maintenance, run `pnpm exec ponder db list` against the production database, then review `pnpm exec ponder db prune` to remove unused schemas. Pruning is destructive to unused historical deployments; keep backups and any rollback schema you need. For heavy read traffic, add `ponder serve --schema <active-write-schema>` processes using the same PostgreSQL database, routing reads to those. Keep one indexing writer per deployment schema.

## Verification record

Checked on 2026-10-28. Commands were run from disposable copies of this release so the submitted tree has no generated dependencies or database data. The [final clean release check](checks/release-checks.txt) records installation, codegen, typecheck and tests together. [INDEXER.md](INDEXER.md) records endpoints and limitations in detail.

The repaired source export is below the 8 MiB upload allowance; see the [size check](checks/bundle-size.txt). Removing the dependency archives changed installation requirements, as documented above; application source and pinned package versions are preserved.

| Check | Result |
| --- | --- |
| `pnpm install` | PASS, exact pinned dependencies installed |
| `pnpm install --frozen-lockfile` with an empty store | PASS, registry installation; versions and integrity hashes preserved after removing vendored archives |
| Self-contained offline installation from this source release | **NOT AVAILABLE**: dependency archives exceed the 8 MiB source upload limit; a connected build or prepopulated package store is required |
| `pnpm codegen`, `pnpm typecheck` | PASS |
| `node scripts/verify-rpc.mjs --at-start` | PASS, chain 1 and nonempty code at all nine addresses, latest and start |
| `pnpm start --schema verification` with public mainnet RPC | PASS, real backfill 26293890–26294247, 13 logs, `/ready` 200; resumed through 26294309 on another endpoint |
| Public 26293890–26294150 example and comparator | PASS, exactly 13 rows, all fields match |
| `curl -i -X OPTIONS` with Origin | PASS, HTTP 204, wildcard origin |
| Read-only SQL range query | PASS, 13 rows, IDs match `<blockNumber>-<logIndex>` |
| `pnpm test` | PASS, seven tests; actual Ponder/PGlite indexes all 57 event types, 2,005 synthetic rows over three pages, rejects other Stacker projects and SQL writes, resumes with data intact |
| Compose configuration parsing | PASS with `env.example` substituted for the operator's `.env`; Postgres has no host port and app binds loopback |
| Docker image build / `docker compose up --build` | **NOT RUN**: Docker daemon returned permission denied |
| PostgreSQL runtime / Railway deployment | **NOT RUN**: no usable container runtime or deployment account was provided |
| GitHub repository creation/publication | **NOT RUN** here: source handoff only; no GitHub publishing tool was provided |

The public chain had no matching events yet for Seasons, Letterbox, PleaHook or Stacker in the sample range. Those are verified empty results, and their handlers were exercised with synthetic events. Synthetic rows are confined to disposable test databases and never enter the shipped configuration or real backfill.
