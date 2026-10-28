import { createConfig, rateLimit } from "ponder";
import { http } from "viem";
import { chain, contract, positiveInteger, rpcUrl } from "./config/contracts.mjs";
import { PLEAAbi } from "./abis/PLEAAbi";
import { CabalGateAbi } from "./abis/CabalGateAbi";
import { SeasonsAbi } from "./abis/SeasonsAbi";
import { PleaDistributorAbi } from "./abis/PleaDistributorAbi";
import { PleaLaunchAbi } from "./abis/PleaLaunchAbi";
import { LetterboxAbi } from "./abis/LetterboxAbi";
import { TribunalAbi } from "./abis/TribunalAbi";
import { PleaHookAbi } from "./abis/PleaHookAbi";
import { StackerAbi } from "./abis/StackerAbi";

export default createConfig({
  chains: {
    mainnet: {
      id: chain.id,
      rpc: rateLimit(http(rpcUrl(), { batch: false, timeout: 20_000 }), {
        requestsPerSecond: positiveInteger("PONDER_RPC_REQUESTS_PER_SECOND", 4),
      }),
      pollingInterval: positiveInteger("PONDER_POLLING_INTERVAL", 12_000),
      ethGetLogsBlockRange: positiveInteger("PONDER_ETH_GET_LOGS_BLOCK_RANGE", 500),
    },
  },
  contracts: {
    PLEA: {
      abi: PLEAAbi,
      chain: "mainnet",
      ...contract("PLEA"),
    },
    CabalGate: {
      abi: CabalGateAbi,
      chain: "mainnet",
      ...contract("CabalGate"),
    },
    Seasons: {
      abi: SeasonsAbi,
      chain: "mainnet",
      ...contract("Seasons"),
    },
    PleaDistributor: {
      abi: PleaDistributorAbi,
      chain: "mainnet",
      ...contract("PleaDistributor"),
    },
    PleaLaunch: {
      abi: PleaLaunchAbi,
      chain: "mainnet",
      ...contract("PleaLaunch"),
    },
    Letterbox: {
      abi: LetterboxAbi,
      chain: "mainnet",
      ...contract("Letterbox"),
    },
    Tribunal: {
      abi: TribunalAbi,
      chain: "mainnet",
      ...contract("Tribunal"),
    },
    PleaHook: {
      abi: PleaHookAbi,
      chain: "mainnet",
      ...contract("PleaHook"),
    },
    Stacker: {
      abi: StackerAbi,
      chain: "mainnet",
      ...contract("Stacker"),
      filter: { event: "Stacked", args: { project: contract("PleaHook").address } },
    },
  },
});
