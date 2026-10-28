// Verified Sourcify ABI. See provenance/Stacker.json and INDEXER.md.
export const StackerAbi = [
  {
    "type": "constructor",
    "inputs": [
      {
        "name": "imd",
        "type": "address",
        "internalType": "contract IERC20"
      },
      {
        "name": "sImd",
        "type": "address",
        "internalType": "contract IStakedIMD"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "name": "AssetMismatch",
    "type": "error",
    "inputs": [
      {
        "name": "vaultAsset",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "imd",
        "type": "address",
        "internalType": "address"
      }
    ]
  },
  {
    "name": "InvalidTrader",
    "type": "error",
    "inputs": []
  },
  {
    "name": "ReentrancyGuardReentrantCall",
    "type": "error",
    "inputs": []
  },
  {
    "name": "SafeERC20FailedOperation",
    "type": "error",
    "inputs": [
      {
        "name": "token",
        "type": "address",
        "internalType": "address"
      }
    ]
  },
  {
    "name": "ZeroShares",
    "type": "error",
    "inputs": []
  },
  {
    "name": "ZeroTrader",
    "type": "error",
    "inputs": []
  },
  {
    "name": "Stacked",
    "type": "event",
    "inputs": [
      {
        "name": "project",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "trader",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "imd",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "shares",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "name": "IMD",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "contract IERC20"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "SIMD",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "contract IStakedIMD"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "credit",
    "type": "function",
    "inputs": [
      {
        "name": "trader",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "imdAmount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "shares",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "name": "projectShares",
    "type": "function",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "projectStacked",
    "type": "function",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "totalStacked",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  }
] as const;
