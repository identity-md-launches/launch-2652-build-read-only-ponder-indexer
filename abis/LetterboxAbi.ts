// Verified Sourcify ABI. See provenance/Letterbox.json and INDEXER.md.
export const LetterboxAbi = [
  {
    "type": "constructor",
    "inputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "BadName",
    "type": "error",
    "inputs": []
  },
  {
    "name": "FeeTooHigh",
    "type": "error",
    "inputs": [
      {
        "name": "maxFeePlea",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "balance",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "name": "LetterTooLong",
    "type": "error",
    "inputs": [
      {
        "name": "length",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "max",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "name": "LetterTooSmall",
    "type": "error",
    "inputs": [
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "name": "MintOnMainnet",
    "type": "error",
    "inputs": []
  },
  {
    "name": "MintWithPoolImd",
    "type": "error",
    "inputs": []
  },
  {
    "name": "NameTaken",
    "type": "error",
    "inputs": []
  },
  {
    "name": "NoPrice",
    "type": "error",
    "inputs": []
  },
  {
    "name": "NotOpen",
    "type": "error",
    "inputs": [
      {
        "name": "id",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "name": "NotSettleable",
    "type": "error",
    "inputs": [
      {
        "name": "id",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "name": "NothingToAppeal",
    "type": "error",
    "inputs": []
  },
  {
    "name": "OracleAssetMismatch",
    "type": "error",
    "inputs": []
  },
  {
    "name": "OracleAssetNotImd",
    "type": "error",
    "inputs": []
  },
  {
    "name": "PendingExists",
    "type": "error",
    "inputs": [
      {
        "name": "id",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "name": "ReentrancyGuardReentrantCall",
    "type": "error",
    "inputs": []
  },
  {
    "name": "SafeCastOverflowedUintDowncast",
    "type": "error",
    "inputs": [
      {
        "name": "bits",
        "type": "uint8",
        "internalType": "uint8"
      },
      {
        "name": "value",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
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
    "name": "StringsInsufficientHexLength",
    "type": "error",
    "inputs": [
      {
        "name": "value",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "length",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "name": "TooSmallForTheFee",
    "type": "error",
    "inputs": [
      {
        "name": "value",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "name": "Delivered",
    "type": "event",
    "inputs": [
      {
        "name": "id",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "runner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "imdOut",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "tip",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "fee",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "name": "Escrowed",
    "type": "event",
    "inputs": [
      {
        "name": "id",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "writer",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "feePlea",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "flags",
        "type": "uint8",
        "indexed": false,
        "internalType": "uint8"
      }
    ],
    "anonymous": false
  },
  {
    "name": "NameSet",
    "type": "event",
    "inputs": [
      {
        "name": "wallet",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "name",
        "type": "string",
        "indexed": false,
        "internalType": "string"
      }
    ],
    "anonymous": false
  },
  {
    "name": "Settled",
    "type": "event",
    "inputs": [
      {
        "name": "id",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "writer",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "tip",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "fallback",
    "stateMutability": "nonpayable"
  },
  {
    "name": "appealAuto",
    "type": "function",
    "inputs": [
      {
        "name": "originalId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "text",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [
      {
        "name": "id",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "name": "deliver",
    "type": "function",
    "inputs": [
      {
        "name": "id",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "out",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "name": "escrowOf",
    "type": "function",
    "inputs": [
      {
        "name": "id",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "writer",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "open",
        "type": "bool",
        "internalType": "bool"
      },
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "soldFor",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "feesFor",
    "type": "function",
    "inputs": [
      {
        "name": "isAppeal",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "outputs": [
      {
        "name": "feeImd",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "maxFeePlea",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "leaderboard",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "out",
        "type": "string",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "letter",
    "type": "function",
    "inputs": [
      {
        "name": "text",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "nameOf",
    "type": "function",
    "inputs": [
      {
        "name": "wallet",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "string",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "nameOwner",
    "type": "function",
    "inputs": [
      {
        "name": "",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "openOf",
    "type": "function",
    "inputs": [
      {
        "name": "writer",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "id",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "openCount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "plead",
    "type": "function",
    "inputs": [
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "text",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [
      {
        "name": "id",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "name": "setName",
    "type": "function",
    "inputs": [
      {
        "name": "name",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "settle",
    "type": "function",
    "inputs": [
      {
        "name": "id",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "status",
    "type": "function",
    "inputs": [
      {
        "name": "w",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "string",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  }
] as const;
