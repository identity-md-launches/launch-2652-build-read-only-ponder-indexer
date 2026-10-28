# Indexer inventory and verification record

The Ponder project is at the **repository root**. Ponder 0.18.1, viem 2.57.13,
Hono 4.13.14, TypeScript 5.9.3, @types/node 22.19.7 and pnpm 10.28.2 are pinned
exactly. Node >=22.12 is required. This is a new standalone raw-log indexer,
not a contract project or website. Source is the release artifact; deployment
and GitHub publication are operator/network handoff actions, not performed here.

## Chain, contracts and starts

There is one chain: `mainnet`, Ethereum **ID 1**. Its only RPC URL input is
`PONDER_RPC_URL_1`; there is no runtime URL default or automatic provider rotation.
`ponder.config.ts` reads the deployment manifest in `config/contracts.mjs`.
The eight PLEA contracts are not proxies. Stacker is registered directly at its
verified emitting address. No factory expansion, call traces, transaction handlers,
or derived state is configured. The start blocks below are the requester's
inclusive defaults; their deployed code was checked at those blocks and at latest.
Stacker was deployed earlier; its requested PLEA-project history starts with PleaHook.

| Contract | Address | Start block | Override prefix | Proxy/factory indexing |
| --- | --- | ---: | --- | --- |
| PLEA | `0x1f158929496162b53fb232536468948e25170ab3` | 26293890 | `PLEA` | Neither |
| CabalGate | `0x39ac882a1161ea19acb6fbdd7a5835d96cf876eb` | 26293890 | `CABAL_GATE` | Neither |
| Seasons | `0xf7c024f7bc96cf152a572f6e184318ff6d380738` | 26293890 | `SEASONS` | Neither |
| PleaDistributor | `0x97face21c7a9f3b64d0f4e0bf21861721fbbfe3e` | 26293890 | `PLEA_DISTRIBUTOR` | Neither |
| PleaLaunch | `0x9e75eabf8d1c905a07a0c99bb9ec9430a065358f` | 26293890 | `PLEA_LAUNCH` | Neither |
| Letterbox | `0x00423ebaed03445fc1452d9a79a51e3c0dfdab5f` | 26294106 | `LETTERBOX` | Neither |
| Tribunal | `0x1aa665eb420f28103324daaaf034de13ee6f53d9` | 26294111 | `TRIBUNAL` | Neither |
| PleaHook | `0xf1122bc96adea8768cff2badf02b6d4594f928cc` | 26294113 | `PLEA_HOOK` | Neither |
| Stacker | `0x06909f672301f28a810f78cfe7a754851269f4f0` | 26294113 | `STACKER` | Neither |

Each prefix has `_ADDRESS` and `_START_BLOCK` variables, documented with defaults
in `env.example`. All addresses are normalized to lowercase. Stacker's filter is:

- Event: verified `Stacked(address indexed project, address indexed trader, uint256 imd, uint256 shares)`.
- Topic0: `0x7fbd7b0bc9aac1aa6f42ea64666fad17288ea759411a11f4231a958bc31838c6`.
- Topic1: the left-padded configured PleaHook address. The default is
  `0x000000000000000000000000f1122bc96adea8768cff2badf02b6d4594f928cc`.
- Start block: 26294113. The hook address override updates this filter automatically.

The other eight contracts have no argument filter. Every event in each verified
ABI is registered, including ERC-20 approvals/transfers, ownership, EIP-712 domain,
and setup events. The configuration has no end block and continues into realtime.

## ABI provenance

All nine ABI arrays were retrieved on 2026-10-28 from the unauthenticated Sourcify
API, using `https://sourcify.dev/server/v2/contract/1/<address>?fields=abi,metadata`.
Each full response is committed at `abis/provenance/<Contract>.json`; each ABI is
exported unchanged as a TypeScript `as const` array in `abis/<Contract>Abi.ts`.
The tests compare that literal to both `abi` and `metadata.output.abi` and verify
that every ABI event has exactly one handler.

| Contract | Verified ABI / metadata source | Committed export |
| --- | --- | --- |
| PLEA | [Sourcify](https://sourcify.dev/server/v2/contract/1/0x1f158929496162b53fb232536468948e25170ab3?fields=abi,metadata) · [repository](https://repo.sourcify.dev/1/0x1f158929496162b53fb232536468948e25170ab3) | [abis/PLEAAbi.ts](abis/PLEAAbi.ts) |
| CabalGate | [Sourcify](https://sourcify.dev/server/v2/contract/1/0x39ac882a1161ea19acb6fbdd7a5835d96cf876eb?fields=abi,metadata) · [repository](https://repo.sourcify.dev/1/0x39ac882a1161ea19acb6fbdd7a5835d96cf876eb) | [abis/CabalGateAbi.ts](abis/CabalGateAbi.ts) |
| Seasons | [Sourcify](https://sourcify.dev/server/v2/contract/1/0xf7c024f7bc96cf152a572f6e184318ff6d380738?fields=abi,metadata) · [repository](https://repo.sourcify.dev/1/0xf7c024f7bc96cf152a572f6e184318ff6d380738) | [abis/SeasonsAbi.ts](abis/SeasonsAbi.ts) |
| PleaDistributor | [Sourcify](https://sourcify.dev/server/v2/contract/1/0x97face21c7a9f3b64d0f4e0bf21861721fbbfe3e?fields=abi,metadata) · [repository](https://repo.sourcify.dev/1/0x97face21c7a9f3b64d0f4e0bf21861721fbbfe3e) | [abis/PleaDistributorAbi.ts](abis/PleaDistributorAbi.ts) |
| PleaLaunch | [Sourcify](https://sourcify.dev/server/v2/contract/1/0x9e75eabf8d1c905a07a0c99bb9ec9430a065358f?fields=abi,metadata) · [repository](https://repo.sourcify.dev/1/0x9e75eabf8d1c905a07a0c99bb9ec9430a065358f) | [abis/PleaLaunchAbi.ts](abis/PleaLaunchAbi.ts) |
| Letterbox | [Sourcify](https://sourcify.dev/server/v2/contract/1/0x00423ebaed03445fc1452d9a79a51e3c0dfdab5f?fields=abi,metadata) · [repository](https://repo.sourcify.dev/1/0x00423ebaed03445fc1452d9a79a51e3c0dfdab5f) | [abis/LetterboxAbi.ts](abis/LetterboxAbi.ts) |
| Tribunal | [Sourcify](https://sourcify.dev/server/v2/contract/1/0x1aa665eb420f28103324daaaf034de13ee6f53d9?fields=abi,metadata) · [repository](https://repo.sourcify.dev/1/0x1aa665eb420f28103324daaaf034de13ee6f53d9) | [abis/TribunalAbi.ts](abis/TribunalAbi.ts) |
| PleaHook | [Sourcify](https://sourcify.dev/server/v2/contract/1/0xf1122bc96adea8768cff2badf02b6d4594f928cc?fields=abi,metadata) · [repository](https://repo.sourcify.dev/1/0xf1122bc96adea8768cff2badf02b6d4594f928cc) | [abis/PleaHookAbi.ts](abis/PleaHookAbi.ts) |
| Stacker | [Sourcify](https://sourcify.dev/server/v2/contract/1/0x06909f672301f28a810f78cfe7a754851269f4f0?fields=abi,metadata) · [repository](https://repo.sourcify.dev/1/0x06909f672301f28a810f78cfe7a754851269f4f0) | [abis/StackerAbi.ts](abis/StackerAbi.ts) |

The Sourcify responses report `runtimeMatch: "match"` for all nine contracts.
They report `creationMatch: "match"` for eight; PleaHook's `creationMatch` is
`null` while its runtime is matched. This record does not claim a full/exact
metadata match where Sourcify does not report one.

The supplementary source reference is
[khaed1/plea at 42e0f855875786a953e945e528e9d7f2724a5352](https://github.com/khaed1/plea/tree/42e0f855875786a953e945e528e9d7f2724a5352/src).
The named main source file's Keccak-256 matches the Sourcify metadata for seven
of the eight PLEA contracts. Seasons differs only in one documentation comment:
the pinned GitHub source says `1%`, while the verified source says `0.75%`.
Its executable source and event declarations are unchanged by that difference;
the ABI used here is still the verified metadata ABI. Hash results are recorded
in [checks/source-check.json](checks/source-check.json). Stacker's ABI provenance
is its own Sourcify record, not an assumed file from the PLEA source commit.

## Table and raw-field mapping

There is exactly one application table, `raw_log`, exported as `rawLog` from
`ponder.schema.ts`. Its primary key is text `id = "<blockNumber>-<logIndex>"`.
All 57 event handlers in `src/index.ts` insert into it with
`onConflictDoNothing()`, using the shared `src/raw-log.ts` mapping.

| Column(s) | Original Ponder/RPC field | Nullability |
| --- | --- | --- |
| `id` | decimal block number + hyphen + decimal log index | primary key |
| `blockNumber`, `blockHash`, `blockTimestamp` | `event.block.number`, `.hash`, `.timestamp` | required |
| `transactionHash`, `transactionIndex` | `event.transaction.hash`, `.transactionIndex` | required |
| `logIndex` | `event.log.logIndex` | required |
| `address` | lowercased `event.log.address` | required |
| `topic0` through `topic3` | `event.log.topics[0..3]`, in order | null only when absent |
| `data` | `event.log.data`, including `0x` | required |

No decoded argument is stored or used to reconstruct a raw log. Ponder itself
uses the ABI to dispatch registered events; the application reads only original
log/block/transaction fields. None of these ABIs declares an anonymous event.
Ponder owns its usual internal sync/cache/reorg/checkpoint tables; there are no
additional application tables. `--views-schema plea` exposes a view of this same
table for stable direct SQL queries. The HTTP API has GraphQL at `/graphql`, SQL
at `/sql/*`, open CORS with preflight, and Ponder's `/health`, `/ready`, `/status`.
`_meta.status` is Ponder's checkpoint status, not a value inferred from the newest log.

## Indexed events

The following signatures are generated from the saved verified ABIs. Each line
has a corresponding `Contract:Event` handler and writes only `raw_log`.

### PLEA (8 events)

```text
PLEA:Allowed(address indexed account)
PLEA:Approval(address indexed owner, address indexed spender, uint256 value)
PLEA:Initialized(address indexed hook)
PLEA:Launched(address indexed launcher, address gate, address seasons, address distributor)
PLEA:LetterboxSet(address indexed letterbox)
PLEA:OwnershipTransferStarted(address indexed previousOwner, address indexed newOwner)
PLEA:OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
PLEA:Transfer(address indexed from, address indexed to, uint256 value)
```

### CabalGate (10 events)

```text
CabalGate:CabalBegins(uint64 at)
CabalGate:EIP712DomainChanged()
CabalGate:OracleSignerSet(address indexed signer)
CabalGate:PleaExpired(uint256 indexed id)
CabalGate:PleaFailed(uint256 indexed id, uint8 status, bytes32 reason, uint16 agreed, uint16 answered)
CabalGate:PleaFlags(uint256 indexed id, uint8 flags)
CabalGate:PleaLapsed(uint256 indexed id)
CabalGate:PleaSubmitted(uint256 indexed id, address indexed seller, uint256 amount, uint8 factScore, uint8 need, uint256 originalId, bytes32 intakeId)
CabalGate:SellExecuted(uint256 indexed id, address indexed seller, uint256 amountIn, uint256 imdOut)
CabalGate:Verdict(uint256 indexed id, bool approved, uint8 score, bytes32 oracleRequestId)
```

### Seasons (8 events)

```text
Seasons:BonusBurned(uint256 indexed season, uint256 amount)
Seasons:BonusPaid(uint256 indexed season, address indexed wallet, uint8 rank, uint256 amount)
Seasons:LeftoverToWall(uint256 amount)
Seasons:PrizeFunded(uint256 indexed season, uint256 amount)
Seasons:PrizePaid(uint256 indexed season, address indexed wallet, uint8 rank, uint256 amount)
Seasons:Recorded(uint256 indexed pleaId, uint256 indexed season, address indexed wallet, uint8 score, uint16 points)
Seasons:SeasonClosedOut(uint256 indexed season, uint256 pot, uint256 paid)
Seasons:SeatMultiplier(uint256 indexed pleaId, address indexed wallet, uint8 score, uint8 pleaPoints)
```

### PleaDistributor (4 events)

```text
PleaDistributor:Claimed(uint256 indexed index, address indexed account, uint256 amount)
PleaDistributor:OwnershipTransferStarted(address indexed previousOwner, address indexed newOwner)
PleaDistributor:OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
PleaDistributor:RootSet(bytes32 root)
```

### PleaLaunch (4 events)

```text
PleaLaunch:HookDeployed(address indexed hook, bytes32 salt)
PleaLaunch:LetterboxDeployed(address indexed letterbox)
PleaLaunch:TradingOpened(uint256 at)
PleaLaunch:TribunalDeployed(address indexed tribunal)
```

### Letterbox (4 events)

```text
Letterbox:Delivered(uint256 indexed id, address indexed runner, uint256 imdOut, uint256 tip, uint256 fee)
Letterbox:Escrowed(uint256 indexed id, address indexed writer, uint256 amount, uint256 feePlea, uint8 flags)
Letterbox:NameSet(address indexed wallet, string name)
Letterbox:Settled(uint256 indexed id, address indexed writer, uint256 amount, uint256 tip)
```

### Tribunal (6 events)

```text
Tribunal:EIP712DomainChanged()
Tribunal:Objected(uint256 indexed id, uint256 indexed pleaId, address indexed objector, bytes32 intakeId)
Tribunal:ObjectionVoid(uint256 indexed id, uint256 indexed pleaId, uint8 status, bytes32 reason)
Tribunal:OracleSignerSet(address indexed signer)
Tribunal:Ruled(uint256 indexed id, uint256 indexed pleaId, bool sustained, uint8 oldScore, uint8 newScore, bytes32 oracleRequestId)
Tribunal:StakeSettled(uint256 indexed id, address indexed to, uint256 amount)
```

### PleaHook (12 events)

```text
PleaHook:CapRatcheted(uint256 previousCap, uint256 newCap)
PleaHook:CashbackPaidClaims(address indexed trader, uint256 amount)
PleaHook:CashbackPaidPlain(address indexed trader, uint256 amount)
PleaHook:CashbackStacked(address indexed trader, uint256 amount)
PleaHook:FeeRefunded(address indexed trader, address currency, uint256 amount, bool asClaims)
PleaHook:FeesTaken(address indexed trader, bool buy, uint256 imdBasis, uint256 imdFee, uint256 pleaBurned, uint256 toPrize)
PleaHook:PayoutsToPool(uint256 amount)
PleaHook:PriceCheckpoint(uint64 hour, uint256 priceX96)
PleaHook:Seeded(uint160 sqrtPriceX96, int24 tick, uint128 liquidity, uint256 pleaDeposited)
PleaHook:Trimmed(uint128 liquidityRemoved, uint256 pleaBurned, uint256 imdRetained)
PleaHook:WallDeployed(int24 tickLower, int24 tickUpper, uint128 liquidity, uint256 imdDeployed)
PleaHook:WallSettled(uint128 liquidity, uint256 pleaBurned, uint256 imdReturned)
```

### Stacker (1 events)

```text
Stacker:Stacked(address indexed project, address indexed trader, uint256 imd, uint256 shares)
```

## Deliberate exclusions

- No ABI events are omitted from the eight PLEA contracts.
- No event type is omitted from Stacker's verified ABI (it declares only Stacked).
  Stacked logs for projects other than the configured PleaHook are excluded by
  topic1, as requested; logs before its configured start are also excluded.
- No other addresses are indexed: PoolManager, IMD, and unrelated factory children
  are outside the requested nine filters. Contract functions/errors are present
  in the full verified ABIs but are not log events or indexing handlers.
- No decoded entities or extra application tables are added; the explicit raw-only
  specification takes precedence over the generic per-entity template.

## Commands and observed results

Checks ran on 2026-10-28 with Node 26.11.1 and pnpm 10.28.2. Dependencies and runtime
state were generated in disposable copies, keeping the release source tree free
of node_modules, secrets, database data and generated build files. The committed
`ponder-env.d.ts` is the actual output of Ponder 0.18.1 codegen.

| Command / check | Observed result |
| --- | --- |
| `pnpm install` | PASS, 164 packages installed, exact root pins |
| `pnpm install --frozen-lockfile --store-dir <empty-store>` | PASS, fresh registry installation after the packaging repair; see [release-checks.txt](checks/release-checks.txt) |
| `pnpm codegen` | PASS, generated `ponder-env.d.ts` |
| `pnpm typecheck` | PASS, `tsc --noEmit` exit 0 |
| `PONDER_RPC_URL_1=https://one.valve.city/rpc/vk_demo/evm/1 PONDER_RPC_REQUESTS_PER_SECOND=1 node scripts/verify-rpc.mjs --at-start` | PASS, all nine addresses have nonempty code at latest and start; head 26294363; [rpc-check.txt](checks/rpc-check.txt), [code-check.json](checks/code-check.json) |
| `PONDER_RPC_URL_1=https://rpc.flashbots.net/fast PONDER_RPC_REQUESTS_PER_SECOND=2 pnpm start --schema verification --port 42069 --hostname 127.0.0.1` | PASS, PGlite backfill 26293890–26294247, one application table, 13 events, ready after about 40 seconds; RPC retries required |
| Same fixed-schema start with `PONDER_RPC_URL_1=https://one.valve.city/rpc/vk_demo/evm/1`, rate 1/s | PASS, crash recovery resumed existing rows/cache, backfilled 26294247–26294282, ready after about 18 seconds, progressed to 26294309; [backfill-resume.txt](checks/backfill-resume.txt) |
| `node scripts/compare.mjs http://127.0.0.1:42069/graphql https://one.valve.city/rpc/vk_demo/evm/1 26293890 26294150` | PASS, exactly 13 logs, all 12 queried fields equal; [compare.txt](checks/compare.txt) |
| Required public sample block/log positions and transaction | PASS, rows 26293890/409–412, 26294106/775–776, 26294111/1200–1201, 26294113/889–893; [example-logs.json](checks/example-logs.json) |
| `curl -i -X OPTIONS .../graphql -H 'Origin: https://example.org' -H 'Access-Control-Request-Method: POST' -H 'Access-Control-Request-Headers: content-type'` | PASS, HTTP 204, wildcard origin, POST/content-type allowed; [cors-preflight.txt](checks/cors-preflight.txt) |
| SQL-over-HTTP ordered block-range SELECT | PASS, 13 rows with exact raw IDs; [sql-sample.json](checks/sql-sample.json); also tested read-only enforcement on the synthetic database |
| `pnpm test` | PASS, seven tests; [tests.txt](checks/tests.txt) |
| `docker compose config` with `env.example` as the env-file input | PASS, no PostgreSQL host port and app bound to loopback; [compose-config.txt](checks/compose-config.txt). Container execution remains NOT RUN. |

The synthetic integration test launches the **real pinned Ponder server and PGlite**
against a local read-only JSON-RPC fixture. It emits one example of every verified
event, adds transfers for 2,005 included rows total, and emits one Stacked log for
a different project that must not be indexed. The exact website query returns
1,000 / 1,000 / 5 rows with hasNextPage true / true / false. The comparator checks
all fields against that fixture, including null topics, four topics, empty data,
and a UTF-8 dynamic string carried as raw bytes. It checks three CORS origins,
SQL reads, rejected SQL deletes, and a restart of the same database/schema with
2,005 rows intact and a fully cached backfill. These are **synthetic tests**, not
claims of 2,005 public mainnet logs.

Other tests check ABI/handler completeness, metadata equality, configuration
validation, hook-filter overrides, every comparator field, missing/extra rows,
inclusive RPC splitting, single-block cap failure, GraphQL errors, stale
checkpoints, and cursor progress. No tests need an internet connection.

### Source packaging repair

The initial export exceeded the 8 MiB upload limit because it included about
190 MB of npm tarballs, including native binaries for many platforms. Those
archives and their pnpm bootstrap wrapper have been removed from the source
release. Every dependency version and SHA-512 integrity in `pnpm-lock.yaml` is
preserved; only local tarball locations were removed to restore standard npm
registry resolution. The Dockerfile installs pinned pnpm 10.28.2 and uses
`pnpm install --frozen-lockfile`. No contract configuration, ABI, schema,
handler, query, or deployment startup behavior changed.

**Offline-install limitation:** a fresh clone now needs registry access (or a
previously populated package store) to install dependencies. The earlier offline
install check applied to the oversized archive export and is not a claim about
this release. The requested self-contained offline dependency bundle is not
included; it cannot fit alongside these pinned runtime dependencies in the
source upload allowance. For isolated servers, build and transfer the Docker
image from a connected machine. Runtime RPC access is still required.

After this packaging change, installation, codegen, typecheck and the seven
tests were rerun in a fresh disposable checkout. The real mainnet backfill and
comparison results above remain the original run's results; no chain-facing
application code changed in this repair. The [source size check](checks/bundle-size.txt)
confirms the repaired export is below the 8 MiB limit.

### Public RPC observations

| Endpoint from the supplied catalog | Observation |
| --- | --- |
| `https://rpc.flashbots.net/fast` | ID 1; real 13-event backfill completed. Intermittent historical-code 504s and stale-head errors; live blockHash log calls timed out, so it was stopped and the indexer resumed on Valve. |
| `https://rpc.mevblocker.io/fast` | HTTP 403 during chain check; not used. |
| `https://one.valve.city/rpc/vk_demo/evm/1` | ID 1; real comparison, block reads and indexer resume passed; parallel exploratory requests sometimes returned 429. |
| `https://ethereum-rpc.publicnode.com` | HTTP 403 during chain check; not used. |
| Nodereal public endpoint listed in the supplied catalog | ID 1; all nine code checks passed. A separate backfill attempt reached public quota (HTTP 429) and was stopped; it is not counted as a completed backfill. |
| `https://virginia.rpc.blxrbdn.com` | ID 1, but historical code unavailable and eth_getLogs returned “method not available”; not used as comparison evidence. |

Flashbots and Valve independently returned the same closing block hash at 26294150:
`0x663eb654df842fa90cac36bcd4dbce15a407ee1c7d78953fe27f8a23406cada2`,
timestamp `0x6ae273a7`. A successful `eth_chainId` alone did not establish log-serving
capability. No private RPC credentials, signing accounts or chain writes were used.

### NOT RUN

- Docker image execution and `docker compose up --build`: Docker answered
  `permission denied while trying to connect to the docker API`.
- PostgreSQL runtime, view switching, Railway hosting/healthcheck activation, and
  HTTPS proxy deployment: no usable container runtime or external deployment
  account was provided. The documented files/instructions are delivered for the owner.
- GitHub repository creation/publication: no GitHub publishing tool was provided;
  this workspace delivers source for the contributor-network release handoff.
- Other Node/OS/architecture combinations, including the Docker Node 22 runtime,
  were not executed on this worker. The lockfile includes their optional packages.

## Extending this release

The single table and exact query are the public data contract. Preserve column
names/types/IDs and raw bytes. Obtain any new ABI from verified metadata, add
explicit handlers, and update this inventory, the shared deployment manifest,
comparator filters and tests together. Use a fresh deployment schema for changed
indexing semantics, retaining the old schema for rollback as needed. Do not add
another chain under this primary key without resolving cross-chain ID collisions.
