// Verified Sourcify ABI. See provenance/Seasons.json and INDEXER.md.
export const SeasonsAbi = [
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
        "name": "imd_",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "seat_",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "nonpayable"
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
    "name": "CallbackNotExpected",
    "type": "error",
    "inputs": []
  },
  {
    "name": "Held",
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
    "name": "NotFinished",
    "type": "error",
    "inputs": []
  },
  {
    "name": "NotReady",
    "type": "error",
    "inputs": [
      {
        "name": "season",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "name": "NotTribunal",
    "type": "error",
    "inputs": []
  },
  {
    "name": "ObjectionSustained",
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
    "name": "OwnerExcluded",
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
    "name": "SeasonClosed",
    "type": "error",
    "inputs": [
      {
        "name": "season",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "name": "UnfundedStake",
    "type": "error",
    "inputs": []
  },
  {
    "name": "BonusBurned",
    "type": "event",
    "inputs": [
      {
        "name": "season",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
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
    "name": "BonusPaid",
    "type": "event",
    "inputs": [
      {
        "name": "season",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "wallet",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "rank",
        "type": "uint8",
        "indexed": false,
        "internalType": "uint8"
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
    "name": "LeftoverToWall",
    "type": "event",
    "inputs": [
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
    "name": "PrizeFunded",
    "type": "event",
    "inputs": [
      {
        "name": "season",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
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
    "name": "PrizePaid",
    "type": "event",
    "inputs": [
      {
        "name": "season",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "wallet",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "rank",
        "type": "uint8",
        "indexed": false,
        "internalType": "uint8"
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
    "name": "Recorded",
    "type": "event",
    "inputs": [
      {
        "name": "pleaId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "season",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "wallet",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "score",
        "type": "uint8",
        "indexed": false,
        "internalType": "uint8"
      },
      {
        "name": "points",
        "type": "uint16",
        "indexed": false,
        "internalType": "uint16"
      }
    ],
    "anonymous": false
  },
  {
    "name": "SeasonClosedOut",
    "type": "event",
    "inputs": [
      {
        "name": "season",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "pot",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "paid",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "name": "SeatMultiplier",
    "type": "event",
    "inputs": [
      {
        "name": "pleaId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "wallet",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "score",
        "type": "uint8",
        "indexed": false,
        "internalType": "uint8"
      },
      {
        "name": "pleaPoints",
        "type": "uint8",
        "indexed": false,
        "internalType": "uint8"
      }
    ],
    "anonymous": false
  },
  {
    "name": "BONUS_PER_SEASON",
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
    "name": "BONUS_SEASONS",
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
    "name": "CLOSE_GRACE",
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
    "name": "MIN_POINTS",
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
    "name": "SEAT_MULTIPLIER_BPS",
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
    "name": "TOP",
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
    "name": "bestOf",
    "type": "function",
    "inputs": [
      {
        "name": "season",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "wallet",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint8[3]",
        "internalType": "uint8[3]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "bonusBurned",
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
    "name": "checkpoint",
    "type": "function",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "checkpointObjection",
    "type": "function",
    "inputs": [
      {
        "name": "pleaId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "closeSeason",
    "type": "function",
    "inputs": [
      {
        "name": "pleaIds",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "closed",
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
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "currentSeason",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "live",
        "type": "bool",
        "internalType": "bool"
      },
      {
        "name": "season",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "endsAt",
        "type": "uint64",
        "internalType": "uint64"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "excluded",
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
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "finished",
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
    "name": "flushToWall",
    "type": "function",
    "inputs": [],
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
        "internalType": "contract IGate"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "holdsSeat",
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
        "type": "bool",
        "internalType": "bool"
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
    "name": "nextToClose",
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
    "name": "pointsFor",
    "type": "function",
    "inputs": [
      {
        "name": "wallet",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "score",
        "type": "uint8",
        "internalType": "uint8"
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
    "name": "pointsOf",
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
        "type": "uint8",
        "internalType": "uint8"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "pot",
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
    "name": "record",
    "type": "function",
    "inputs": [
      {
        "name": "pleaId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "recorded",
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
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "rollover",
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
    "name": "seasonBounds",
    "type": "function",
    "inputs": [
      {
        "name": "season",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "exists",
        "type": "bool",
        "internalType": "bool"
      },
      {
        "name": "start",
        "type": "uint64",
        "internalType": "uint64"
      },
      {
        "name": "end",
        "type": "uint64",
        "internalType": "uint64"
      },
      {
        "name": "ended",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "seasonFees",
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
    "name": "seat",
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
    "name": "shareBps",
    "type": "function",
    "inputs": [
      {
        "name": "rank",
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
    "stateMutability": "pure"
  },
  {
    "name": "topOf",
    "type": "function",
    "inputs": [
      {
        "name": "season",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple[25]",
        "components": [
          {
            "name": "wallet",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "points",
            "type": "uint16",
            "internalType": "uint16"
          },
          {
            "name": "pleaId",
            "type": "uint64",
            "internalType": "uint64"
          }
        ],
        "internalType": "struct Seasons.Entry[25]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "unlockCallback",
    "type": "function",
    "inputs": [
      {
        "name": "data",
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
