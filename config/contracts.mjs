/** The single-chain deployment manifest, shared by Ponder and the RPC comparator. */
export const chain = Object.freeze({ name: "mainnet", id: 1 });

export const defaults = Object.freeze({
  PLEA: { env: "PLEA", address: "0x1f158929496162b53fb232536468948e25170ab3", startBlock: 26293890 },
  CabalGate: { env: "CABAL_GATE", address: "0x39ac882a1161ea19acb6fbdd7a5835d96cf876eb", startBlock: 26293890 },
  Seasons: { env: "SEASONS", address: "0xf7c024f7bc96cf152a572f6e184318ff6d380738", startBlock: 26293890 },
  PleaDistributor: { env: "PLEA_DISTRIBUTOR", address: "0x97face21c7a9f3b64d0f4e0bf21861721fbbfe3e", startBlock: 26293890 },
  PleaLaunch: { env: "PLEA_LAUNCH", address: "0x9e75eabf8d1c905a07a0c99bb9ec9430a065358f", startBlock: 26293890 },
  Letterbox: { env: "LETTERBOX", address: "0x00423ebaed03445fc1452d9a79a51e3c0dfdab5f", startBlock: 26294106 },
  Tribunal: { env: "TRIBUNAL", address: "0x1aa665eb420f28103324daaaf034de13ee6f53d9", startBlock: 26294111 },
  PleaHook: { env: "PLEA_HOOK", address: "0xf1122bc96adea8768cff2badf02b6d4594f928cc", startBlock: 26294113 },
  Stacker: { env: "STACKER", address: "0x06909f672301f28a810f78cfe7a754851269f4f0", startBlock: 26294113 },
});

/** @param {string} name @param {number} fallback @param {NodeJS.ProcessEnv} [env] */
export function positiveInteger(name, fallback, env = process.env) {
  const value = env[name] || String(fallback);
  if (!/^[0-9]+$/.test(value) || !Number.isSafeInteger(Number(value)) || Number(value) < 1) {
    throw new Error(`${name} must be a positive safe integer`);
  }
  return Number(value);
}

/** @param {keyof typeof defaults} name @param {NodeJS.ProcessEnv} [env] */
export function contract(name, env = process.env) {
  const entry = defaults[name];
  const address = env[`${entry.env}_ADDRESS`] || entry.address;
  if (!/^0x[0-9a-fA-F]{40}$/.test(address) || /^0x0{40}$/i.test(address)) {
    throw new Error(`${entry.env}_ADDRESS must be a nonzero 20-byte Ethereum address`);
  }
  return {
    address: /** @type {`0x${string}`} */ (address.toLowerCase()),
    startBlock: positiveInteger(`${entry.env}_START_BLOCK`, entry.startBlock, env),
  };
}

/** @param {NodeJS.ProcessEnv} [env] */
export function rpcUrl(env = process.env) {
  const value = env.PONDER_RPC_URL_1;
  if (!value) throw new Error("Set PONDER_RPC_URL_1 to an Ethereum mainnet HTTP(S) RPC URL");
  let parsed;
  try { parsed = new URL(value); } catch { throw new Error("PONDER_RPC_URL_1 must be an HTTP(S) URL"); }
  if (!["https:", "http:"].includes(parsed.protocol)) throw new Error("PONDER_RPC_URL_1 must be an HTTP(S) URL");
  return value;
}
