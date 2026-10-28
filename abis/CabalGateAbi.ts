// Verified Sourcify ABI. See provenance/CabalGate.json and INDEXER.md.
export const CabalGateAbi = [
  {
    "type": "constructor",
    "inputs": [
      {
        "name": "plea_",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "intake_",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "oracleAsset_",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "imd_",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "oracleSigner_",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "season_",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "deadman_",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "name": "AlreadyAppealed",
    "type": "error",
    "inputs": []
  },
  {
    "name": "AlreadyBegun",
    "type": "error",
    "inputs": []
  },
  {
    "name": "AlreadyConsumed",
    "type": "error",
    "inputs": [
      {
        "name": "requestId",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ]
  },
  {
    "name": "AmountTooLarge",
    "type": "error",
    "inputs": []
  },
  {
    "name": "AmountTooSmall",
    "type": "error",
    "inputs": []
  },
  {
    "name": "AppealClosed",
    "type": "error",
    "inputs": []
  },
  {
    "name": "AttestationExpired",
    "type": "error",
    "inputs": [
      {
        "name": "expiresAt",
        "type": "uint64",
        "internalType": "uint64"
      }
    ]
  },
  {
    "name": "AttestationNotYetValid",
    "type": "error",
    "inputs": [
      {
        "name": "issuedAt",
        "type": "uint64",
        "internalType": "uint64"
      }
    ]
  },
  {
    "name": "BadFlags",
    "type": "error",
    "inputs": []
  },
  {
    "name": "BadPleaText",
    "type": "error",
    "inputs": []
  },
  {
    "name": "BadSignature",
    "type": "error",
    "inputs": []
  },
  {
    "name": "CabalNotWatching",
    "type": "error",
    "inputs": []
  },
  {
    "name": "CallbackNotExpected",
    "type": "error",
    "inputs": []
  },
  {
    "name": "CannotPass",
    "type": "error",
    "inputs": [
      {
        "name": "need",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "name": "Cooldown",
    "type": "error",
    "inputs": [
      {
        "name": "until",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "name": "FeeTooHigh",
    "type": "error",
    "inputs": [
      {
        "name": "pleaIn",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "maxPleaIn",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "name": "InvalidShortString",
    "type": "error",
    "inputs": []
  },
  {
    "name": "NotApproved",
    "type": "error",
    "inputs": []
  },
  {
    "name": "NotDenied",
    "type": "error",
    "inputs": []
  },
  {
    "name": "NotIntake",
    "type": "error",
    "inputs": []
  },
  {
    "name": "NotLauncher",
    "type": "error",
    "inputs": []
  },
  {
    "name": "NotLetterbox",
    "type": "error",
    "inputs": []
  },
  {
    "name": "NotPending",
    "type": "error",
    "inputs": []
  },
  {
    "name": "NotPoolManager",
    "type": "error",
    "inputs": []
  },
  {
    "name": "NotSeller",
    "type": "error",
    "inputs": []
  },
  {
    "name": "NotStale",
    "type": "error",
    "inputs": []
  },
  {
    "name": "PartialFill",
    "type": "error",
    "inputs": [
      {
        "name": "sold",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "name": "PendingExists",
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
    "name": "ScoreOutOfRange",
    "type": "error",
    "inputs": [
      {
        "name": "score",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "name": "SlippageExceeded",
    "type": "error",
    "inputs": [
      {
        "name": "out",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "minOut",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "name": "StringTooLong",
    "type": "error",
    "inputs": [
      {
        "name": "str",
        "type": "string",
        "internalType": "string"
      }
    ]
  },
  {
    "name": "TooLate",
    "type": "error",
    "inputs": []
  },
  {
    "name": "UnknownRequest",
    "type": "error",
    "inputs": [
      {
        "name": "intakeId",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ]
  },
  {
    "name": "UseLetterbox",
    "type": "error",
    "inputs": []
  },
  {
    "name": "WindowLapsed",
    "type": "error",
    "inputs": []
  },
  {
    "name": "WrongAnswerType",
    "type": "error",
    "inputs": [
      {
        "name": "expected",
        "type": "uint8",
        "internalType": "uint8"
      },
      {
        "name": "got",
        "type": "uint8",
        "internalType": "uint8"
      }
    ]
  },
  {
    "name": "WrongPanel",
    "type": "error",
    "inputs": []
  },
  {
    "name": "ZeroSigner",
    "type": "error",
    "inputs": []
  },
  {
    "name": "ZeroTiming",
    "type": "error",
    "inputs": []
  },
  {
    "name": "CabalBegins",
    "type": "event",
    "inputs": [
      {
        "name": "at",
        "type": "uint64",
        "indexed": false,
        "internalType": "uint64"
      }
    ],
    "anonymous": false
  },
  {
    "name": "EIP712DomainChanged",
    "type": "event",
    "inputs": [],
    "anonymous": false
  },
  {
    "name": "OracleSignerSet",
    "type": "event",
    "inputs": [
      {
        "name": "signer",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "name": "PleaExpired",
    "type": "event",
    "inputs": [
      {
        "name": "id",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "name": "PleaFailed",
    "type": "event",
    "inputs": [
      {
        "name": "id",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "status",
        "type": "uint8",
        "indexed": false,
        "internalType": "uint8"
      },
      {
        "name": "reason",
        "type": "bytes32",
        "indexed": false,
        "internalType": "bytes32"
      },
      {
        "name": "agreed",
        "type": "uint16",
        "indexed": false,
        "internalType": "uint16"
      },
      {
        "name": "answered",
        "type": "uint16",
        "indexed": false,
        "internalType": "uint16"
      }
    ],
    "anonymous": false
  },
  {
    "name": "PleaFlags",
    "type": "event",
    "inputs": [
      {
        "name": "id",
        "type": "uint256",
        "indexed": true,
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
    "name": "PleaLapsed",
    "type": "event",
    "inputs": [
      {
        "name": "id",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "name": "PleaSubmitted",
    "type": "event",
    "inputs": [
      {
        "name": "id",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "seller",
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
        "name": "factScore",
        "type": "uint8",
        "indexed": false,
        "internalType": "uint8"
      },
      {
        "name": "need",
        "type": "uint8",
        "indexed": false,
        "internalType": "uint8"
      },
      {
        "name": "originalId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "intakeId",
        "type": "bytes32",
        "indexed": false,
        "internalType": "bytes32"
      }
    ],
    "anonymous": false
  },
  {
    "name": "SellExecuted",
    "type": "event",
    "inputs": [
      {
        "name": "id",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "seller",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "amountIn",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "imdOut",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "name": "Verdict",
    "type": "event",
    "inputs": [
      {
        "name": "id",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "approved",
        "type": "bool",
        "indexed": false,
        "internalType": "bool"
      },
      {
        "name": "score",
        "type": "uint8",
        "indexed": false,
        "internalType": "uint8"
      },
      {
        "name": "oracleRequestId",
        "type": "bytes32",
        "indexed": false,
        "internalType": "bytes32"
      }
    ],
    "anonymous": false
  },
  {
    "name": "ACTION",
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
    "name": "APPEAL_POOL_SHARE",
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
    "name": "COOLDOWN",
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
    "name": "DEADMAN",
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
    "name": "EXECUTE_WINDOW",
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
    "name": "FLAG_AUTO_SELL",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint8",
        "internalType": "uint8"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "FLAG_BY_LETTER",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint8",
        "internalType": "uint8"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "ISSUED_AT_TOLERANCE",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint64",
        "internalType": "uint64"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "MAX_PLEA_BYTES",
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
    "name": "MAX_PLEA_SCORE",
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
    "name": "MAX_SELL",
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
    "name": "MAX_SHARE_BPS",
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
    "name": "MIN_SHARE_BPS",
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
    "name": "ORACLE_FEE",
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
    "name": "PANEL_SIZE",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint16",
        "internalType": "uint16"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "PASS_MARK",
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
    "name": "PENDING_EXPIRY",
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
    "name": "QUESTION_CHAIN",
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
    "name": "QUORUM",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint16",
        "internalType": "uint16"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "SEASON",
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
    "name": "appeal",
    "type": "function",
    "inputs": [
      {
        "name": "originalId",
        "type": "uint256",
        "internalType": "uint256"
      },
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
    "name": "appealFor",
    "type": "function",
    "inputs": [
      {
        "name": "seller",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "originalId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "balance",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "text",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "flags",
        "type": "uint8",
        "internalType": "uint8"
      },
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
    "outputs": [
      {
        "name": "id",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "feePlea",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "name": "attestationDigest",
    "type": "function",
    "inputs": [
      {
        "name": "a",
        "type": "tuple",
        "components": [
          {
            "name": "requestId",
            "type": "bytes32",
            "internalType": "bytes32"
          },
          {
            "name": "chainId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "questionHash",
            "type": "bytes32",
            "internalType": "bytes32"
          },
          {
            "name": "answerType",
            "type": "uint8",
            "internalType": "uint8"
          },
          {
            "name": "answer",
            "type": "bytes",
            "internalType": "bytes"
          },
          {
            "name": "figure",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "fromBlock",
            "type": "uint64",
            "internalType": "uint64"
          },
          {
            "name": "toBlock",
            "type": "uint64",
            "internalType": "uint64"
          },
          {
            "name": "blockHash",
            "type": "bytes32",
            "internalType": "bytes32"
          },
          {
            "name": "panelJobId",
            "type": "bytes32",
            "internalType": "bytes32"
          },
          {
            "name": "panelSize",
            "type": "uint16",
            "internalType": "uint16"
          },
          {
            "name": "quorum",
            "type": "uint16",
            "internalType": "uint16"
          },
          {
            "name": "agreed",
            "type": "uint16",
            "internalType": "uint16"
          },
          {
            "name": "issuedAt",
            "type": "uint64",
            "internalType": "uint64"
          },
          {
            "name": "expiresAt",
            "type": "uint64",
            "internalType": "uint64"
          }
        ],
        "internalType": "struct OracleAttestation.Attestation"
      }
    ],
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
    "name": "begin",
    "type": "function",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "body",
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
        "name": "",
        "type": "string",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "cabalAlive",
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
    "name": "consumed",
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
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "diedAt",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint64",
        "internalType": "uint64"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "eip712Domain",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "fields",
        "type": "bytes1",
        "internalType": "bytes1"
      },
      {
        "name": "name",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "version",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "chainId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "verifyingContract",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "salt",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "extensions",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "executeSell",
    "type": "function",
    "inputs": [
      {
        "name": "minOut",
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
    "name": "executeSellFor",
    "type": "function",
    "inputs": [
      {
        "name": "id",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "minOut",
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
    "name": "expire",
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
    "name": "factScore",
    "type": "function",
    "inputs": [
      {
        "name": "seller",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "score",
        "type": "uint8",
        "internalType": "uint8"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "getPlea",
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
        "name": "",
        "type": "tuple",
        "components": [
          {
            "name": "seller",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "factScore",
            "type": "uint8",
            "internalType": "uint8"
          },
          {
            "name": "need",
            "type": "uint8",
            "internalType": "uint8"
          },
          {
            "name": "score",
            "type": "uint8",
            "internalType": "uint8"
          },
          {
            "name": "status",
            "type": "uint8",
            "internalType": "enum CabalGate.Status"
          },
          {
            "name": "appealed",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "isAppeal",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "flags",
            "type": "uint8",
            "internalType": "uint8"
          },
          {
            "name": "amount",
            "type": "uint128",
            "internalType": "uint128"
          },
          {
            "name": "submittedAt",
            "type": "uint64",
            "internalType": "uint64"
          },
          {
            "name": "verdictAt",
            "type": "uint64",
            "internalType": "uint64"
          },
          {
            "name": "originalId",
            "type": "uint64",
            "internalType": "uint64"
          },
          {
            "name": "intakeId",
            "type": "bytes32",
            "internalType": "bytes32"
          },
          {
            "name": "text",
            "type": "string",
            "internalType": "string"
          }
        ],
        "internalType": "struct CabalGate.Plea"
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
        "internalType": "contract IPleaHook"
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
        "internalType": "contract IERC20"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "intake",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "contract IIntake"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "lastDeniedAt",
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
    "name": "lastExecutedAt",
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
    "name": "lastLapsedAt",
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
    "name": "lastPleaOf",
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
    "name": "lastVerdictAt",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint64",
        "internalType": "uint64"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "nextId",
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
    "name": "onOracleResult",
    "type": "function",
    "inputs": [
      {
        "name": "intakeId",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "a",
        "type": "tuple",
        "components": [
          {
            "name": "requestId",
            "type": "bytes32",
            "internalType": "bytes32"
          },
          {
            "name": "chainId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "questionHash",
            "type": "bytes32",
            "internalType": "bytes32"
          },
          {
            "name": "answerType",
            "type": "uint8",
            "internalType": "uint8"
          },
          {
            "name": "answer",
            "type": "bytes",
            "internalType": "bytes"
          },
          {
            "name": "figure",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "fromBlock",
            "type": "uint64",
            "internalType": "uint64"
          },
          {
            "name": "toBlock",
            "type": "uint64",
            "internalType": "uint64"
          },
          {
            "name": "blockHash",
            "type": "bytes32",
            "internalType": "bytes32"
          },
          {
            "name": "panelJobId",
            "type": "bytes32",
            "internalType": "bytes32"
          },
          {
            "name": "panelSize",
            "type": "uint16",
            "internalType": "uint16"
          },
          {
            "name": "quorum",
            "type": "uint16",
            "internalType": "uint16"
          },
          {
            "name": "agreed",
            "type": "uint16",
            "internalType": "uint16"
          },
          {
            "name": "issuedAt",
            "type": "uint64",
            "internalType": "uint64"
          },
          {
            "name": "expiresAt",
            "type": "uint64",
            "internalType": "uint64"
          }
        ],
        "internalType": "struct OracleAttestation.Attestation"
      },
      {
        "name": "signature",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "onPleaFailure",
    "type": "function",
    "inputs": [
      {
        "name": "intakeId",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "status",
        "type": "uint8",
        "internalType": "uint8"
      },
      {
        "name": "reason",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "agreed",
        "type": "uint16",
        "internalType": "uint16"
      },
      {
        "name": "answered",
        "type": "uint16",
        "internalType": "uint16"
      },
      {
        "name": "",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "oracleAsset",
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
    "name": "oracleSigner",
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
    "name": "pendingOf",
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
    "name": "plea",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "contract IPLEA"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "pleaBalance",
    "type": "function",
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
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
    "name": "pleaFlags",
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
        "name": "",
        "type": "uint8",
        "internalType": "uint8"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "pleaOfIntake",
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
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "pleaText",
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
        "name": "",
        "type": "string",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "question",
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
        "name": "",
        "type": "string",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "restricted",
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
    "name": "result",
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
        "name": "seller",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "score",
        "type": "uint8",
        "internalType": "uint8"
      },
      {
        "name": "approved",
        "type": "bool",
        "internalType": "bool"
      },
      {
        "name": "verdictAt",
        "type": "uint64",
        "internalType": "uint64"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "startedAt",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint64",
        "internalType": "uint64"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "submitFor",
    "type": "function",
    "inputs": [
      {
        "name": "seller",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "balance",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "text",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "flags",
        "type": "uint8",
        "internalType": "uint8"
      },
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
    "outputs": [
      {
        "name": "id",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "feePlea",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "name": "submitSell",
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
    "name": "unlockCallback",
    "type": "function",
    "inputs": [
      {
        "name": "raw",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "stateMutability": "nonpayable"
  }
] as const;
