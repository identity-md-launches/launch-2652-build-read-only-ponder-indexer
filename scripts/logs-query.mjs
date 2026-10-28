// Keep this query identical to the website's contract, including string BigInt variables.
export const LOGS_QUERY = `query Logs($from: BigInt!, $to: BigInt!, $after: String) {
  rawLogs(where: { blockNumber_gte: $from, blockNumber_lte: $to }, orderBy: "id", orderDirection: "asc", limit: 1000, after: $after) {
    items { blockNumber blockHash blockTimestamp transactionHash transactionIndex logIndex address topic0 topic1 topic2 topic3 data }
    pageInfo { hasNextPage endCursor }
  }
  _meta { status }
}`;

export function comparePosition(a, b) {
  const difference = BigInt(a.blockNumber) - BigInt(b.blockNumber);
  return difference < 0n ? -1 : difference > 0n ? 1 : a.logIndex - b.logIndex;
}

export const rowId = (row) => `${row.blockNumber}-${row.logIndex}`;

export async function readGraphqlLogs(url, from, to, report = console.log) {
  let after = null;
  let page = 0;
  let lastId = null;
  let status;
  const cursors = new Set();
  const ids = new Set();
  const rows = [];
  for (;;) {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: LOGS_QUERY, variables: { from: String(from), to: String(to), after } }),
      signal: AbortSignal.timeout(30_000),
    });
    if (!response.ok) throw new Error(`GraphQL HTTP ${response.status}`);
    const body = await response.json();
    if (body.errors?.length) throw new Error(`GraphQL errors: ${JSON.stringify(body.errors)}`);
    const result = body.data?.rawLogs;
    status = body.data?._meta?.status;
    const mainnet = status?.mainnet;
    if (mainnet?.id !== 1 || !Number.isSafeInteger(mainnet.block?.number) ||
        !Number.isSafeInteger(mainnet.block?.timestamp)) {
      throw new Error("_meta.status must report mainnet id=1 and its indexed block number/timestamp");
    }
    if (BigInt(mainnet.block.number) < to) {
      throw new Error(`Indexer is only at ${mainnet.block.number}; requested through ${to}`);
    }
    if (!Array.isArray(result?.items) || typeof result.pageInfo?.hasNextPage !== "boolean" || result.items.length > 1000) {
      throw new Error("Invalid GraphQL page");
    }
    for (const row of result.items) {
      if (typeof row.blockNumber !== "string" || typeof row.blockTimestamp !== "string" ||
          !Number.isSafeInteger(row.logIndex) || !Number.isSafeInteger(row.transactionIndex)) {
        throw new Error("GraphQL returned invalid BigInt/index types");
      }
      if (BigInt(row.blockNumber) < from || BigInt(row.blockNumber) > to) throw new Error("GraphQL row outside requested range");
      const id = rowId(row);
      if (ids.has(id)) throw new Error(`Duplicate GraphQL log ${id}`);
      if (lastId !== null && id <= lastId) throw new Error(`GraphQL id order regressed at ${id}`);
      ids.add(id);
      lastId = id;
      rows.push(row);
    }
    report(`GraphQL page ${++page}: ${result.items.length} rows; hasNextPage=${result.pageInfo.hasNextPage}`);
    if (!result.pageInfo.hasNextPage) break;
    const next = result.pageInfo.endCursor;
    if (result.items.length === 0 || typeof next !== "string" || !next || cursors.has(next)) {
      throw new Error("GraphQL pagination did not advance");
    }
    cursors.add(next);
    after = next;
  }
  return { rows: rows.sort(comparePosition), status, pages: page };
}
