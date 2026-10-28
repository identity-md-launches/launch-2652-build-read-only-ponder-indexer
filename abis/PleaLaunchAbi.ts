// Verified Sourcify ABI. See provenance/PleaLaunch.json and INDEXER.md.
export const PleaLaunchAbi = [
  {
    "type": "constructor",
    "inputs": [
      {
        "name": "plea_",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "gate_",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "seasons_",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "distributor_",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "poolManager_",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "imd_",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "stacker_",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "creditGas_",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "start_",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "oracleAsset_",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "mintOracleFee_",
        "type": "bool",
        "internalType": "bool"
      },
      {
        "name": "letterboxCodeHash_",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "tribunalCodeHash_",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "name": "BelowAgreedMarketCap",
    "type": "error",
    "inputs": []
  },
  {
    "name": "BelowAgreedTiming",
    "type": "error",
    "inputs": []
  },
  {
    "name": "HookAlreadyDeployed",
    "type": "error",
    "inputs": []
  },
  {
    "name": "HookDeployFailed",
    "type": "error",
    "inputs": []
  },
  {
    "name": "HookNotDeployed",
    "type": "error",
    "inputs": []
  },
  {
    "name": "LetterboxAlreadyDeployed",
    "type": "error",
    "inputs": []
  },
  {
    "name": "LetterboxDeployFailed",
    "type": "error",
    "inputs": []
  },
  {
    "name": "LetterboxNotDeployed",
    "type": "error",
    "inputs": []
  },
  {
    "name": "MintWithPoolImd",
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
    "name": "TooEarly",
    "type": "error",
    "inputs": [
      {
        "name": "start",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "name": "TribunalAlreadyDeployed",
    "type": "error",
    "inputs": []
  },
  {
    "name": "TribunalDeployFailed",
    "type": "error",
    "inputs": []
  },
  {
    "name": "TribunalNotDeployed",
    "type": "error",
    "inputs": []
  },
  {
    "name": "TribunalOff",
    "type": "error",
    "inputs": []
  },
  {
    "name": "WrongFlags",
    "type": "error",
    "inputs": [
      {
        "name": "hook",
        "type": "address",
        "internalType": "address"
      }
    ]
  },
  {
    "name": "WrongInitCode",
    "type": "error",
    "inputs": []
  },
  {
    "name": "HookDeployed",
    "type": "event",
    "inputs": [
      {
        "name": "hook",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "salt",
        "type": "bytes32",
        "indexed": false,
        "internalType": "bytes32"
      }
    ],
    "anonymous": false
  },
  {
    "name": "LetterboxDeployed",
    "type": "event",
    "inputs": [
      {
        "name": "letterbox",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "name": "TradingOpened",
    "type": "event",
    "inputs": [
      {
        "name": "at",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "name": "TribunalDeployed",
    "type": "event",
    "inputs": [
      {
        "name": "tribunal",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "name": "FLAGS",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint160",
        "internalType": "uint160"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "FLAG_MASK",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint160",
        "internalType": "uint160"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "START",
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
  },
  {
    "name": "deployHook",
    "type": "function",
    "inputs": [
      {
        "name": "salt",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "initCode",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [
      {
        "name": "deployed",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "name": "deployLetterbox",
    "type": "function",
    "inputs": [
      {
        "name": "creationCode",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [
      {
        "name": "deployed",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "name": "deployTribunal",
    "type": "function",
    "inputs": [
      {
        "name": "creationCode",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [
      {
        "name": "deployed",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "name": "gate",
    "type": "function",
    "inputs": [],
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
    "name": "hook",
    "type": "function",
    "inputs": [],
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
    "name": "hookInitCodeHash",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "imd",
    "type": "function",
    "inputs": [],
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
    "name": "letterbox",
    "type": "function",
    "inputs": [],
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
    "name": "letterboxCodeHash",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "mintOracleFee",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "opened",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "oracleAsset",
    "type": "function",
    "inputs": [],
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
    "name": "owner",
    "type": "function",
    "inputs": [],
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
    "name": "plea",
    "type": "function",
    "inputs": [],
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
    "name": "poolManager",
    "type": "function",
    "inputs": [],
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
    "name": "predict",
    "type": "function",
    "inputs": [
      {
        "name": "salt",
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
    "name": "predictLetterbox",
    "type": "function",
    "inputs": [],
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
    "name": "predictTribunal",
    "type": "function",
    "inputs": [],
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
    "name": "seasons",
    "type": "function",
    "inputs": [],
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
    "name": "seed",
    "type": "function",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "tribunal",
    "type": "function",
    "inputs": [],
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
    "name": "tribunalCodeHash",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "view"
  }
] as const;
