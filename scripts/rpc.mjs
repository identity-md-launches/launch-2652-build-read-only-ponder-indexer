import { positiveInteger } from "../config/contracts.mjs";

export const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export class RpcError extends Error {
  constructor(method, code, message) {
    super(`${method}: RPC ${code}: ${String(message).slice(0, 300)}`);
    this.code = code;
  }
}

// Serial requests, bounded timeouts/retries, and no credentials printed in diagnostics.
export function rpcClient(url, { requestsPerSecond = positiveInteger("PONDER_RPC_REQUESTS_PER_SECOND", 4) } = {}) {
  let id = 0;
  let nextRequest = 0;
  return async (method, params) => {
    for (let attempt = 0; ; attempt++) {
      await pause(Math.max(0, nextRequest - Date.now()));
      nextRequest = Date.now() + Math.ceil(1000 / requestsPerSecond);
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jsonrpc: "2.0", id: ++id, method, params }),
          signal: AbortSignal.timeout(20_000),
        });
        if (!response.ok) {
          const error = new Error(`${method}: HTTP ${response.status}`);
          error.retryable = [429, 502, 503, 504].includes(response.status);
          throw error;
        }
        const body = await response.json();
        if (body.error) throw new RpcError(method, body.error.code, body.error.message);
        if (!Object.hasOwn(body, "result")) throw new Error(`${method}: response has no result`);
        return body.result;
      } catch (error) {
        const retryable = error.retryable || error.name === "TimeoutError" || error instanceof TypeError ||
          (error instanceof RpcError && /rate|too many requests|temporar|timeout|busy/i.test(error.message));
        if (!retryable || attempt >= 2) throw error;
        await pause(500 * 2 ** attempt);
      }
    }
  };
}

export async function assertMainnet(rpc) {
  const id = await rpc("eth_chainId", []);
  if (BigInt(id) !== 1n) throw new Error(`Expected Ethereum chain ID 1; received ${id}`);
}

export const quantity = (value) => `0x${BigInt(value).toString(16)}`;

export function blockNumber(value, label) {
  if (!/^[0-9]+$/.test(value ?? "")) throw new Error(`${label} must be a nonnegative decimal block number`);
  return BigInt(value);
}
