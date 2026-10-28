import type { Event } from "ponder:registry";

// Only the original RPC fields are stored. Never decode or re-encode event.args.
export function rawLogRow(event: Pick<Event<"PLEA:Transfer">, "block" | "transaction" | "log">) {
  return {
    id: `${event.block.number}-${event.log.logIndex}`,
    blockNumber: event.block.number,
    blockHash: event.block.hash,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.transaction.hash,
    transactionIndex: event.transaction.transactionIndex,
    logIndex: event.log.logIndex,
    address: event.log.address.toLowerCase() as `0x${string}`,
    topic0: event.log.topics[0] ?? null,
    topic1: event.log.topics[1] ?? null,
    topic2: event.log.topics[2] ?? null,
    topic3: event.log.topics[3] ?? null,
    data: event.log.data,
  };
}
