// Verified Sourcify ABI. See provenance/Tribunal.json and INDEXER.md.
export const TribunalAbi = [
  {
    "type": "constructor",
    "inputs": [],
    "stateMutability": "nonpayable"
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
    "name": "AlreadyRecorded",
    "type": "error",
    "inputs": [
      {
        "name": "pleaId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "name": "AlreadySettled",
    "type": "error",
    "inputs": [
      {
        "name": "objectionId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
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
    "name": "BadObjectionText",
    "type": "error",
    "inputs": []
  },
  {
    "name": "BadSignature",
    "type": "error",
    "inputs": []
  },
  {
    "name": "CaseClosed",
    "type": "error",
    "inputs": [
      {
        "name": "pleaId",
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
    "name": "MintOnMainnet",
    "type": "error",
    "inputs": []
  },
  {
    "name": "NotApproved",
    "type": "error",
    "inputs": [
      {
        "name": "pleaId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "name": "NotEligible",
    "type": "error",
    "inputs": []
  },
  {
    "name": "NotIntake",
    "type": "error",
    "inputs": []
  },
  {
    "name": "NotPending",
    "type": "error",
    "inputs": []
  },
  {
    "name": "NotRuled",
    "type": "error",
    "inputs": [
      {
        "name": "objectionId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "name": "NotStale",
    "type": "error",
    "inputs": []
  },
  {
    "name": "ObjectionPending",
    "type": "error",
    "inputs": [
      {
        "name": "objectionId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "name": "OracleAssetNotImd",
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
    "name": "SameObjector",
    "type": "error",
    "inputs": []
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
    "name": "SellerExcluded",
    "type": "error",
    "inputs": []
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
    "name": "WindowClosed",
    "type": "error",
    "inputs": [
      {
        "name": "pleaId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
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
    "name": "EIP712DomainChanged",
    "type": "event",
    "inputs": [],
    "anonymous": false
  },
  {
    "name": "Objected",
    "type": "event",
    "inputs": [
      {
        "name": "id",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "pleaId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "objector",
        "type": "address",
        "indexed": true,
        "internalType": "address"
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
    "name": "ObjectionVoid",
    "type": "event",
    "inputs": [
      {
        "name": "id",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "pleaId",
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
      }
    ],
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
    "name": "Ruled",
    "type": "event",
    "inputs": [
      {
        "name": "id",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "pleaId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "sustained",
        "type": "bool",
        "indexed": false,
        "internalType": "bool"
      },
      {
        "name": "oldScore",
        "type": "uint8",
        "indexed": false,
        "internalType": "uint8"
      },
      {
        "name": "newScore",
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
    "name": "StakeSettled",
    "type": "event",
    "inputs": [
      {
        "name": "id",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "to",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
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
    "name": "MARGIN",
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
    "name": "MAX_OBJECTIONS",
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
    "name": "MAX_TEXT_BYTES",
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
    "name": "NO_SCORE",
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
    "name": "OBJECTION_WINDOW",
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
    "name": "STAKE",
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
    "name": "caseOf",
    "type": "function",
    "inputs": [
      {
        "name": "pleaId",
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
            "name": "count",
            "type": "uint8",
            "internalType": "uint8"
          },
          {
            "name": "lowest",
            "type": "uint8",
            "internalType": "uint8"
          },
          {
            "name": "sustained",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "lastObjector",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "pending",
            "type": "uint64[2]",
            "internalType": "uint64[2]"
          }
        ],
        "internalType": "struct Tribunal.Case"
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
    "name": "gate",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "contract CabalGate"
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
    "name": "object",
    "type": "function",
    "inputs": [
      {
        "name": "pleaId",
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
    "name": "objection",
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
            "name": "pleaId",
            "type": "uint64",
            "internalType": "uint64"
          },
          {
            "name": "objector",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "ruling",
            "type": "uint8",
            "internalType": "enum Tribunal.Ruling"
          },
          {
            "name": "newScore",
            "type": "uint8",
            "internalType": "uint8"
          },
          {
            "name": "settled",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "filedAt",
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
        "internalType": "struct Tribunal.Objection"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "objectionOfIntake",
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
    "name": "onObjectionFailure",
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
        "name": "",
        "type": "uint16",
        "internalType": "uint16"
      },
      {
        "name": "",
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
    "name": "seasons",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "contract ISeasonsForTribunal"
      }
    ],
    "stateMutability": "view"
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
    "name": "standing",
    "type": "function",
    "inputs": [
      {
        "name": "pleaId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "held",
        "type": "bool",
        "internalType": "bool"
      },
      {
        "name": "sustained",
        "type": "bool",
        "internalType": "bool"
      },
      {
        "name": "lowest",
        "type": "uint8",
        "internalType": "uint8"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "status",
    "type": "function",
    "inputs": [
      {
        "name": "pleaId",
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
  }
] as const;
