export const PermissionsLib = 
{
  "contractName": "PermissionsLib",
  "abi": [],
  "bytecode": "0x60606040523415600e57600080fd5b603580601b6000396000f3006060604052600080fd00a165627a7a72305820c354ce7b74c3d2f71d288e1e04a33cbf1ca35c1d7dcdd13bafeacebea2bedd460029",
  "deployedBytecode": "0x6060604052600080fd00a165627a7a72305820c354ce7b74c3d2f71d288e1e04a33cbf1ca35c1d7dcdd13bafeacebea2bedd460029",
  "sourceMap": "610:2090:15:-;;;;;;;;;;;;;;;;;",
  "deployedSourceMap": "610:2090:15:-;;;;;",
  "source": "/*\n\n  Copyright 2017 Dharma Labs Inc.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n\n*/\n\npragma solidity 0.4.18;\n\n\nlibrary PermissionsLib {\n    struct Permissions {\n        mapping (address => bool) authorized;\n        mapping (address => uint) agentToIndex; // ensures O(1) look-up\n        address[] authorizedAgents;\n    }\n\n    function authorize(Permissions storage self, address agent)\n        internal\n    {\n        require(isNotAuthorized(self, agent));\n\n        self.authorized[agent] = true;\n        self.authorizedAgents.push(agent);\n        self.agentToIndex[agent] = self.authorizedAgents.length - 1;\n    }\n\n    function revokeAuthorization(Permissions storage self, address agent)\n        internal\n    {\n        /* We only want to do work in the case where the agent whose\n        authorization is being revoked had authorization permissions in the\n        first place. */\n        require(isAuthorized(self, agent));\n\n        uint indexOfAgentToRevoke = self.agentToIndex[agent];\n        uint indexOfAgentToMove = self.authorizedAgents.length - 1;\n        address agentToMove = self.authorizedAgents[indexOfAgentToMove];\n\n        // Revoke the agent's authorization.\n        delete self.authorized[agent];\n\n        // Remove the agent from our collection of authorized agents.\n        self.authorizedAgents[indexOfAgentToRevoke] = agentToMove;\n\n        // Update our indices to reflect the above changes.\n        self.agentToIndex[agentToMove] = indexOfAgentToRevoke;\n        delete self.agentToIndex[agent];\n\n        // Clean up memory that's no longer being used.\n        delete self.authorizedAgents[indexOfAgentToMove];\n        self.authorizedAgents.length -= 1;\n    }\n\n    function isAuthorized(Permissions storage self, address agent)\n        internal\n        view\n        returns (bool)\n    {\n        return self.authorized[agent];\n    }\n\n    function isNotAuthorized(Permissions storage self, address agent)\n        internal\n        view\n        returns (bool)\n    {\n        return !isAuthorized(self, agent);\n    }\n\n    function getAuthorizedAgents(Permissions storage self)\n        internal\n        view\n        returns (address[])\n    {\n        return self.authorizedAgents;\n    }\n}\n",
  "sourcePath": "/Users/nadavhollander/Documents/Dharma/Development/charta/contracts/libraries/PermissionsLib.sol",
  "ast": {
    "attributes": {
      "absolutePath": "/Users/nadavhollander/Documents/Dharma/Development/charta/contracts/libraries/PermissionsLib.sol",
      "exportedSymbols": {
        "PermissionsLib": [
          4970
        ]
      }
    },
    "children": [
      {
        "attributes": {
          "literals": [
            "solidity",
            "0.4",
            ".18"
          ]
        },
        "id": 4792,
        "name": "PragmaDirective",
        "src": "584:23:15"
      },
      {
        "attributes": {
          "baseContracts": [
            null
          ],
          "contractDependencies": [
            null
          ],
          "contractKind": "library",
          "documentation": null,
          "fullyImplemented": true,
          "linearizedBaseContracts": [
            4970
          ],
          "name": "PermissionsLib",
          "scope": 4971
        },
        "children": [
          {
            "attributes": {
              "canonicalName": "PermissionsLib.Permissions",
              "name": "Permissions",
              "scope": 4970,
              "visibility": "public"
            },
            "children": [
              {
                "attributes": {
                  "constant": false,
                  "name": "authorized",
                  "scope": 4804,
                  "stateVariable": false,
                  "storageLocation": "default",
                  "type": "mapping(address => bool)",
                  "value": null,
                  "visibility": "internal"
                },
                "children": [
                  {
                    "attributes": {
                      "type": "mapping(address => bool)"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 4793,
                        "name": "ElementaryTypeName",
                        "src": "677:7:15"
                      },
                      {
                        "attributes": {
                          "name": "bool",
                          "type": "bool"
                        },
                        "id": 4794,
                        "name": "ElementaryTypeName",
                        "src": "688:4:15"
                      }
                    ],
                    "id": 4795,
                    "name": "Mapping",
                    "src": "668:25:15"
                  }
                ],
                "id": 4796,
                "name": "VariableDeclaration",
                "src": "668:36:15"
              },
              {
                "attributes": {
                  "constant": false,
                  "name": "agentToIndex",
                  "scope": 4804,
                  "stateVariable": false,
                  "storageLocation": "default",
                  "type": "mapping(address => uint256)",
                  "value": null,
                  "visibility": "internal"
                },
                "children": [
                  {
                    "attributes": {
                      "type": "mapping(address => uint256)"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 4797,
                        "name": "ElementaryTypeName",
                        "src": "723:7:15"
                      },
                      {
                        "attributes": {
                          "name": "uint",
                          "type": "uint256"
                        },
                        "id": 4798,
                        "name": "ElementaryTypeName",
                        "src": "734:4:15"
                      }
                    ],
                    "id": 4799,
                    "name": "Mapping",
                    "src": "714:25:15"
                  }
                ],
                "id": 4800,
                "name": "VariableDeclaration",
                "src": "714:38:15"
              },
              {
                "attributes": {
                  "constant": false,
                  "name": "authorizedAgents",
                  "scope": 4804,
                  "stateVariable": false,
                  "storageLocation": "default",
                  "type": "address[] storage pointer",
                  "value": null,
                  "visibility": "internal"
                },
                "children": [
                  {
                    "attributes": {
                      "length": null,
                      "type": "address[] storage pointer"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 4801,
                        "name": "ElementaryTypeName",
                        "src": "786:7:15"
                      }
                    ],
                    "id": 4802,
                    "name": "ArrayTypeName",
                    "src": "786:9:15"
                  }
                ],
                "id": 4803,
                "name": "VariableDeclaration",
                "src": "786:26:15"
              }
            ],
            "id": 4804,
            "name": "StructDefinition",
            "src": "639:180:15"
          },
          {
            "attributes": {
              "constant": false,
              "implemented": true,
              "isConstructor": false,
              "modifiers": [
                null
              ],
              "name": "authorize",
              "payable": false,
              "scope": 4970,
              "stateMutability": "nonpayable",
              "superFunction": null,
              "visibility": "internal"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "self",
                      "scope": 4847,
                      "stateVariable": false,
                      "storageLocation": "storage",
                      "type": "struct PermissionsLib.Permissions storage pointer",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "contractScope": null,
                          "name": "Permissions",
                          "referencedDeclaration": 4804,
                          "type": "struct PermissionsLib.Permissions storage pointer"
                        },
                        "id": 4805,
                        "name": "UserDefinedTypeName",
                        "src": "844:11:15"
                      }
                    ],
                    "id": 4806,
                    "name": "VariableDeclaration",
                    "src": "844:24:15"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "agent",
                      "scope": 4847,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 4807,
                        "name": "ElementaryTypeName",
                        "src": "870:7:15"
                      }
                    ],
                    "id": 4808,
                    "name": "VariableDeclaration",
                    "src": "870:13:15"
                  }
                ],
                "id": 4809,
                "name": "ParameterList",
                "src": "843:41:15"
              },
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 4810,
                "name": "ParameterList",
                "src": "906:0:15"
              },
              {
                "children": [
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "type": "tuple()",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                }
                              ],
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 8370,
                              "type": "function (bool) pure",
                              "value": "require"
                            },
                            "id": 4811,
                            "name": "Identifier",
                            "src": "916:7:15"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "isStructConstructorCall": false,
                              "lValueRequested": false,
                              "names": [
                                null
                              ],
                              "type": "bool",
                              "type_conversion": false
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": [
                                    {
                                      "typeIdentifier": "t_struct$_Permissions_$4804_storage_ptr",
                                      "typeString": "struct PermissionsLib.Permissions storage pointer"
                                    },
                                    {
                                      "typeIdentifier": "t_address",
                                      "typeString": "address"
                                    }
                                  ],
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 4957,
                                  "type": "function (struct PermissionsLib.Permissions storage pointer,address) view returns (bool)",
                                  "value": "isNotAuthorized"
                                },
                                "id": 4812,
                                "name": "Identifier",
                                "src": "924:15:15"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 4806,
                                  "type": "struct PermissionsLib.Permissions storage pointer",
                                  "value": "self"
                                },
                                "id": 4813,
                                "name": "Identifier",
                                "src": "940:4:15"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 4808,
                                  "type": "address",
                                  "value": "agent"
                                },
                                "id": 4814,
                                "name": "Identifier",
                                "src": "946:5:15"
                              }
                            ],
                            "id": 4815,
                            "name": "FunctionCall",
                            "src": "924:28:15"
                          }
                        ],
                        "id": 4816,
                        "name": "FunctionCall",
                        "src": "916:37:15"
                      }
                    ],
                    "id": 4817,
                    "name": "ExpressionStatement",
                    "src": "916:37:15"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "=",
                          "type": "bool"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "type": "bool"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "authorized",
                                  "referencedDeclaration": 4796,
                                  "type": "mapping(address => bool)"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 4806,
                                      "type": "struct PermissionsLib.Permissions storage pointer",
                                      "value": "self"
                                    },
                                    "id": 4818,
                                    "name": "Identifier",
                                    "src": "964:4:15"
                                  }
                                ],
                                "id": 4821,
                                "name": "MemberAccess",
                                "src": "964:15:15"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 4808,
                                  "type": "address",
                                  "value": "agent"
                                },
                                "id": 4820,
                                "name": "Identifier",
                                "src": "980:5:15"
                              }
                            ],
                            "id": 4822,
                            "name": "IndexAccess",
                            "src": "964:22:15"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "hexvalue": "74727565",
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "lValueRequested": false,
                              "subdenomination": null,
                              "token": "bool",
                              "type": "bool",
                              "value": "true"
                            },
                            "id": 4823,
                            "name": "Literal",
                            "src": "989:4:15"
                          }
                        ],
                        "id": 4824,
                        "name": "Assignment",
                        "src": "964:29:15"
                      }
                    ],
                    "id": 4825,
                    "name": "ExpressionStatement",
                    "src": "964:29:15"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "type": "uint256",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                }
                              ],
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "push",
                              "referencedDeclaration": null,
                              "type": "function (address) returns (uint256)"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "authorizedAgents",
                                  "referencedDeclaration": 4803,
                                  "type": "address[] storage ref"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 4806,
                                      "type": "struct PermissionsLib.Permissions storage pointer",
                                      "value": "self"
                                    },
                                    "id": 4826,
                                    "name": "Identifier",
                                    "src": "1003:4:15"
                                  }
                                ],
                                "id": 4829,
                                "name": "MemberAccess",
                                "src": "1003:21:15"
                              }
                            ],
                            "id": 4830,
                            "name": "MemberAccess",
                            "src": "1003:26:15"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 4808,
                              "type": "address",
                              "value": "agent"
                            },
                            "id": 4831,
                            "name": "Identifier",
                            "src": "1030:5:15"
                          }
                        ],
                        "id": 4832,
                        "name": "FunctionCall",
                        "src": "1003:33:15"
                      }
                    ],
                    "id": 4833,
                    "name": "ExpressionStatement",
                    "src": "1003:33:15"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "=",
                          "type": "uint256"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "type": "uint256"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "agentToIndex",
                                  "referencedDeclaration": 4800,
                                  "type": "mapping(address => uint256)"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 4806,
                                      "type": "struct PermissionsLib.Permissions storage pointer",
                                      "value": "self"
                                    },
                                    "id": 4834,
                                    "name": "Identifier",
                                    "src": "1046:4:15"
                                  }
                                ],
                                "id": 4837,
                                "name": "MemberAccess",
                                "src": "1046:17:15"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 4808,
                                  "type": "address",
                                  "value": "agent"
                                },
                                "id": 4836,
                                "name": "Identifier",
                                "src": "1064:5:15"
                              }
                            ],
                            "id": 4838,
                            "name": "IndexAccess",
                            "src": "1046:24:15"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "commonType": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              },
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "operator": "-",
                              "type": "uint256"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "length",
                                  "referencedDeclaration": null,
                                  "type": "uint256"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "isConstant": false,
                                      "isLValue": true,
                                      "isPure": false,
                                      "lValueRequested": false,
                                      "member_name": "authorizedAgents",
                                      "referencedDeclaration": 4803,
                                      "type": "address[] storage ref"
                                    },
                                    "children": [
                                      {
                                        "attributes": {
                                          "argumentTypes": null,
                                          "overloadedDeclarations": [
                                            null
                                          ],
                                          "referencedDeclaration": 4806,
                                          "type": "struct PermissionsLib.Permissions storage pointer",
                                          "value": "self"
                                        },
                                        "id": 4839,
                                        "name": "Identifier",
                                        "src": "1073:4:15"
                                      }
                                    ],
                                    "id": 4840,
                                    "name": "MemberAccess",
                                    "src": "1073:21:15"
                                  }
                                ],
                                "id": 4841,
                                "name": "MemberAccess",
                                "src": "1073:28:15"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "hexvalue": "31",
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "lValueRequested": false,
                                  "subdenomination": null,
                                  "token": "number",
                                  "type": "int_const 1",
                                  "value": "1"
                                },
                                "id": 4842,
                                "name": "Literal",
                                "src": "1104:1:15"
                              }
                            ],
                            "id": 4843,
                            "name": "BinaryOperation",
                            "src": "1073:32:15"
                          }
                        ],
                        "id": 4844,
                        "name": "Assignment",
                        "src": "1046:59:15"
                      }
                    ],
                    "id": 4845,
                    "name": "ExpressionStatement",
                    "src": "1046:59:15"
                  }
                ],
                "id": 4846,
                "name": "Block",
                "src": "906:206:15"
              }
            ],
            "id": 4847,
            "name": "FunctionDefinition",
            "src": "825:287:15"
          },
          {
            "attributes": {
              "constant": false,
              "implemented": true,
              "isConstructor": false,
              "modifiers": [
                null
              ],
              "name": "revokeAuthorization",
              "payable": false,
              "scope": 4970,
              "stateMutability": "nonpayable",
              "superFunction": null,
              "visibility": "internal"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "self",
                      "scope": 4926,
                      "stateVariable": false,
                      "storageLocation": "storage",
                      "type": "struct PermissionsLib.Permissions storage pointer",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "contractScope": null,
                          "name": "Permissions",
                          "referencedDeclaration": 4804,
                          "type": "struct PermissionsLib.Permissions storage pointer"
                        },
                        "id": 4848,
                        "name": "UserDefinedTypeName",
                        "src": "1147:11:15"
                      }
                    ],
                    "id": 4849,
                    "name": "VariableDeclaration",
                    "src": "1147:24:15"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "agent",
                      "scope": 4926,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 4850,
                        "name": "ElementaryTypeName",
                        "src": "1173:7:15"
                      }
                    ],
                    "id": 4851,
                    "name": "VariableDeclaration",
                    "src": "1173:13:15"
                  }
                ],
                "id": 4852,
                "name": "ParameterList",
                "src": "1146:41:15"
              },
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 4853,
                "name": "ParameterList",
                "src": "1209:0:15"
              },
              {
                "children": [
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "type": "tuple()",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                }
                              ],
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 8370,
                              "type": "function (bool) pure",
                              "value": "require"
                            },
                            "id": 4854,
                            "name": "Identifier",
                            "src": "1388:7:15"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "isStructConstructorCall": false,
                              "lValueRequested": false,
                              "names": [
                                null
                              ],
                              "type": "bool",
                              "type_conversion": false
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": [
                                    {
                                      "typeIdentifier": "t_struct$_Permissions_$4804_storage_ptr",
                                      "typeString": "struct PermissionsLib.Permissions storage pointer"
                                    },
                                    {
                                      "typeIdentifier": "t_address",
                                      "typeString": "address"
                                    }
                                  ],
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 4941,
                                  "type": "function (struct PermissionsLib.Permissions storage pointer,address) view returns (bool)",
                                  "value": "isAuthorized"
                                },
                                "id": 4855,
                                "name": "Identifier",
                                "src": "1396:12:15"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 4849,
                                  "type": "struct PermissionsLib.Permissions storage pointer",
                                  "value": "self"
                                },
                                "id": 4856,
                                "name": "Identifier",
                                "src": "1409:4:15"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 4851,
                                  "type": "address",
                                  "value": "agent"
                                },
                                "id": 4857,
                                "name": "Identifier",
                                "src": "1415:5:15"
                              }
                            ],
                            "id": 4858,
                            "name": "FunctionCall",
                            "src": "1396:25:15"
                          }
                        ],
                        "id": 4859,
                        "name": "FunctionCall",
                        "src": "1388:34:15"
                      }
                    ],
                    "id": 4860,
                    "name": "ExpressionStatement",
                    "src": "1388:34:15"
                  },
                  {
                    "attributes": {
                      "assignments": [
                        4862
                      ]
                    },
                    "children": [
                      {
                        "attributes": {
                          "constant": false,
                          "name": "indexOfAgentToRevoke",
                          "scope": 4926,
                          "stateVariable": false,
                          "storageLocation": "default",
                          "type": "uint256",
                          "value": null,
                          "visibility": "internal"
                        },
                        "children": [
                          {
                            "attributes": {
                              "name": "uint",
                              "type": "uint256"
                            },
                            "id": 4861,
                            "name": "ElementaryTypeName",
                            "src": "1433:4:15"
                          }
                        ],
                        "id": 4862,
                        "name": "VariableDeclaration",
                        "src": "1433:25:15"
                      },
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "type": "uint256"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "agentToIndex",
                              "referencedDeclaration": 4800,
                              "type": "mapping(address => uint256)"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 4849,
                                  "type": "struct PermissionsLib.Permissions storage pointer",
                                  "value": "self"
                                },
                                "id": 4863,
                                "name": "Identifier",
                                "src": "1461:4:15"
                              }
                            ],
                            "id": 4864,
                            "name": "MemberAccess",
                            "src": "1461:17:15"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 4851,
                              "type": "address",
                              "value": "agent"
                            },
                            "id": 4865,
                            "name": "Identifier",
                            "src": "1479:5:15"
                          }
                        ],
                        "id": 4866,
                        "name": "IndexAccess",
                        "src": "1461:24:15"
                      }
                    ],
                    "id": 4867,
                    "name": "VariableDeclarationStatement",
                    "src": "1433:52:15"
                  },
                  {
                    "attributes": {
                      "assignments": [
                        4869
                      ]
                    },
                    "children": [
                      {
                        "attributes": {
                          "constant": false,
                          "name": "indexOfAgentToMove",
                          "scope": 4926,
                          "stateVariable": false,
                          "storageLocation": "default",
                          "type": "uint256",
                          "value": null,
                          "visibility": "internal"
                        },
                        "children": [
                          {
                            "attributes": {
                              "name": "uint",
                              "type": "uint256"
                            },
                            "id": 4868,
                            "name": "ElementaryTypeName",
                            "src": "1495:4:15"
                          }
                        ],
                        "id": 4869,
                        "name": "VariableDeclaration",
                        "src": "1495:23:15"
                      },
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "-",
                          "type": "uint256"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "length",
                              "referencedDeclaration": null,
                              "type": "uint256"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "authorizedAgents",
                                  "referencedDeclaration": 4803,
                                  "type": "address[] storage ref"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 4849,
                                      "type": "struct PermissionsLib.Permissions storage pointer",
                                      "value": "self"
                                    },
                                    "id": 4870,
                                    "name": "Identifier",
                                    "src": "1521:4:15"
                                  }
                                ],
                                "id": 4871,
                                "name": "MemberAccess",
                                "src": "1521:21:15"
                              }
                            ],
                            "id": 4872,
                            "name": "MemberAccess",
                            "src": "1521:28:15"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "hexvalue": "31",
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "lValueRequested": false,
                              "subdenomination": null,
                              "token": "number",
                              "type": "int_const 1",
                              "value": "1"
                            },
                            "id": 4873,
                            "name": "Literal",
                            "src": "1552:1:15"
                          }
                        ],
                        "id": 4874,
                        "name": "BinaryOperation",
                        "src": "1521:32:15"
                      }
                    ],
                    "id": 4875,
                    "name": "VariableDeclarationStatement",
                    "src": "1495:58:15"
                  },
                  {
                    "attributes": {
                      "assignments": [
                        4877
                      ]
                    },
                    "children": [
                      {
                        "attributes": {
                          "constant": false,
                          "name": "agentToMove",
                          "scope": 4926,
                          "stateVariable": false,
                          "storageLocation": "default",
                          "type": "address",
                          "value": null,
                          "visibility": "internal"
                        },
                        "children": [
                          {
                            "attributes": {
                              "name": "address",
                              "type": "address"
                            },
                            "id": 4876,
                            "name": "ElementaryTypeName",
                            "src": "1563:7:15"
                          }
                        ],
                        "id": 4877,
                        "name": "VariableDeclaration",
                        "src": "1563:19:15"
                      },
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "type": "address"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "authorizedAgents",
                              "referencedDeclaration": 4803,
                              "type": "address[] storage ref"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 4849,
                                  "type": "struct PermissionsLib.Permissions storage pointer",
                                  "value": "self"
                                },
                                "id": 4878,
                                "name": "Identifier",
                                "src": "1585:4:15"
                              }
                            ],
                            "id": 4879,
                            "name": "MemberAccess",
                            "src": "1585:21:15"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 4869,
                              "type": "uint256",
                              "value": "indexOfAgentToMove"
                            },
                            "id": 4880,
                            "name": "Identifier",
                            "src": "1607:18:15"
                          }
                        ],
                        "id": 4881,
                        "name": "IndexAccess",
                        "src": "1585:41:15"
                      }
                    ],
                    "id": 4882,
                    "name": "VariableDeclarationStatement",
                    "src": "1563:63:15"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "delete",
                          "prefix": true,
                          "type": "tuple()"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "type": "bool"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "authorized",
                                  "referencedDeclaration": 4796,
                                  "type": "mapping(address => bool)"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 4849,
                                      "type": "struct PermissionsLib.Permissions storage pointer",
                                      "value": "self"
                                    },
                                    "id": 4883,
                                    "name": "Identifier",
                                    "src": "1689:4:15"
                                  }
                                ],
                                "id": 4884,
                                "name": "MemberAccess",
                                "src": "1689:15:15"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 4851,
                                  "type": "address",
                                  "value": "agent"
                                },
                                "id": 4885,
                                "name": "Identifier",
                                "src": "1705:5:15"
                              }
                            ],
                            "id": 4886,
                            "name": "IndexAccess",
                            "src": "1689:22:15"
                          }
                        ],
                        "id": 4887,
                        "name": "UnaryOperation",
                        "src": "1682:29:15"
                      }
                    ],
                    "id": 4888,
                    "name": "ExpressionStatement",
                    "src": "1682:29:15"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "=",
                          "type": "address"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "type": "address"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "authorizedAgents",
                                  "referencedDeclaration": 4803,
                                  "type": "address[] storage ref"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 4849,
                                      "type": "struct PermissionsLib.Permissions storage pointer",
                                      "value": "self"
                                    },
                                    "id": 4889,
                                    "name": "Identifier",
                                    "src": "1792:4:15"
                                  }
                                ],
                                "id": 4892,
                                "name": "MemberAccess",
                                "src": "1792:21:15"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 4862,
                                  "type": "uint256",
                                  "value": "indexOfAgentToRevoke"
                                },
                                "id": 4891,
                                "name": "Identifier",
                                "src": "1814:20:15"
                              }
                            ],
                            "id": 4893,
                            "name": "IndexAccess",
                            "src": "1792:43:15"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 4877,
                              "type": "address",
                              "value": "agentToMove"
                            },
                            "id": 4894,
                            "name": "Identifier",
                            "src": "1838:11:15"
                          }
                        ],
                        "id": 4895,
                        "name": "Assignment",
                        "src": "1792:57:15"
                      }
                    ],
                    "id": 4896,
                    "name": "ExpressionStatement",
                    "src": "1792:57:15"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "=",
                          "type": "uint256"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "type": "uint256"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "agentToIndex",
                                  "referencedDeclaration": 4800,
                                  "type": "mapping(address => uint256)"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 4849,
                                      "type": "struct PermissionsLib.Permissions storage pointer",
                                      "value": "self"
                                    },
                                    "id": 4897,
                                    "name": "Identifier",
                                    "src": "1920:4:15"
                                  }
                                ],
                                "id": 4900,
                                "name": "MemberAccess",
                                "src": "1920:17:15"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 4877,
                                  "type": "address",
                                  "value": "agentToMove"
                                },
                                "id": 4899,
                                "name": "Identifier",
                                "src": "1938:11:15"
                              }
                            ],
                            "id": 4901,
                            "name": "IndexAccess",
                            "src": "1920:30:15"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 4862,
                              "type": "uint256",
                              "value": "indexOfAgentToRevoke"
                            },
                            "id": 4902,
                            "name": "Identifier",
                            "src": "1953:20:15"
                          }
                        ],
                        "id": 4903,
                        "name": "Assignment",
                        "src": "1920:53:15"
                      }
                    ],
                    "id": 4904,
                    "name": "ExpressionStatement",
                    "src": "1920:53:15"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "delete",
                          "prefix": true,
                          "type": "tuple()"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "type": "uint256"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "agentToIndex",
                                  "referencedDeclaration": 4800,
                                  "type": "mapping(address => uint256)"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 4849,
                                      "type": "struct PermissionsLib.Permissions storage pointer",
                                      "value": "self"
                                    },
                                    "id": 4905,
                                    "name": "Identifier",
                                    "src": "1990:4:15"
                                  }
                                ],
                                "id": 4906,
                                "name": "MemberAccess",
                                "src": "1990:17:15"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 4851,
                                  "type": "address",
                                  "value": "agent"
                                },
                                "id": 4907,
                                "name": "Identifier",
                                "src": "2008:5:15"
                              }
                            ],
                            "id": 4908,
                            "name": "IndexAccess",
                            "src": "1990:24:15"
                          }
                        ],
                        "id": 4909,
                        "name": "UnaryOperation",
                        "src": "1983:31:15"
                      }
                    ],
                    "id": 4910,
                    "name": "ExpressionStatement",
                    "src": "1983:31:15"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "delete",
                          "prefix": true,
                          "type": "tuple()"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "type": "address"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "authorizedAgents",
                                  "referencedDeclaration": 4803,
                                  "type": "address[] storage ref"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 4849,
                                      "type": "struct PermissionsLib.Permissions storage pointer",
                                      "value": "self"
                                    },
                                    "id": 4911,
                                    "name": "Identifier",
                                    "src": "2088:4:15"
                                  }
                                ],
                                "id": 4912,
                                "name": "MemberAccess",
                                "src": "2088:21:15"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 4869,
                                  "type": "uint256",
                                  "value": "indexOfAgentToMove"
                                },
                                "id": 4913,
                                "name": "Identifier",
                                "src": "2110:18:15"
                              }
                            ],
                            "id": 4914,
                            "name": "IndexAccess",
                            "src": "2088:41:15"
                          }
                        ],
                        "id": 4915,
                        "name": "UnaryOperation",
                        "src": "2081:48:15"
                      }
                    ],
                    "id": 4916,
                    "name": "ExpressionStatement",
                    "src": "2081:48:15"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "-=",
                          "type": "uint256"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "member_name": "length",
                              "referencedDeclaration": null,
                              "type": "uint256"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "authorizedAgents",
                                  "referencedDeclaration": 4803,
                                  "type": "address[] storage ref"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 4849,
                                      "type": "struct PermissionsLib.Permissions storage pointer",
                                      "value": "self"
                                    },
                                    "id": 4917,
                                    "name": "Identifier",
                                    "src": "2139:4:15"
                                  }
                                ],
                                "id": 4920,
                                "name": "MemberAccess",
                                "src": "2139:21:15"
                              }
                            ],
                            "id": 4921,
                            "name": "MemberAccess",
                            "src": "2139:28:15"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "hexvalue": "31",
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "lValueRequested": false,
                              "subdenomination": null,
                              "token": "number",
                              "type": "int_const 1",
                              "value": "1"
                            },
                            "id": 4922,
                            "name": "Literal",
                            "src": "2171:1:15"
                          }
                        ],
                        "id": 4923,
                        "name": "Assignment",
                        "src": "2139:33:15"
                      }
                    ],
                    "id": 4924,
                    "name": "ExpressionStatement",
                    "src": "2139:33:15"
                  }
                ],
                "id": 4925,
                "name": "Block",
                "src": "1209:970:15"
              }
            ],
            "id": 4926,
            "name": "FunctionDefinition",
            "src": "1118:1061:15"
          },
          {
            "attributes": {
              "constant": true,
              "implemented": true,
              "isConstructor": false,
              "modifiers": [
                null
              ],
              "name": "isAuthorized",
              "payable": false,
              "scope": 4970,
              "stateMutability": "view",
              "superFunction": null,
              "visibility": "internal"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "self",
                      "scope": 4941,
                      "stateVariable": false,
                      "storageLocation": "storage",
                      "type": "struct PermissionsLib.Permissions storage pointer",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "contractScope": null,
                          "name": "Permissions",
                          "referencedDeclaration": 4804,
                          "type": "struct PermissionsLib.Permissions storage pointer"
                        },
                        "id": 4927,
                        "name": "UserDefinedTypeName",
                        "src": "2207:11:15"
                      }
                    ],
                    "id": 4928,
                    "name": "VariableDeclaration",
                    "src": "2207:24:15"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "agent",
                      "scope": 4941,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 4929,
                        "name": "ElementaryTypeName",
                        "src": "2233:7:15"
                      }
                    ],
                    "id": 4930,
                    "name": "VariableDeclaration",
                    "src": "2233:13:15"
                  }
                ],
                "id": 4931,
                "name": "ParameterList",
                "src": "2206:41:15"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "",
                      "scope": 4941,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "bool",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "bool",
                          "type": "bool"
                        },
                        "id": 4932,
                        "name": "ElementaryTypeName",
                        "src": "2295:4:15"
                      }
                    ],
                    "id": 4933,
                    "name": "VariableDeclaration",
                    "src": "2295:4:15"
                  }
                ],
                "id": 4934,
                "name": "ParameterList",
                "src": "2294:6:15"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "functionReturnParameters": 4934
                    },
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "type": "bool"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "authorized",
                              "referencedDeclaration": 4796,
                              "type": "mapping(address => bool)"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 4928,
                                  "type": "struct PermissionsLib.Permissions storage pointer",
                                  "value": "self"
                                },
                                "id": 4935,
                                "name": "Identifier",
                                "src": "2322:4:15"
                              }
                            ],
                            "id": 4936,
                            "name": "MemberAccess",
                            "src": "2322:15:15"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 4930,
                              "type": "address",
                              "value": "agent"
                            },
                            "id": 4937,
                            "name": "Identifier",
                            "src": "2338:5:15"
                          }
                        ],
                        "id": 4938,
                        "name": "IndexAccess",
                        "src": "2322:22:15"
                      }
                    ],
                    "id": 4939,
                    "name": "Return",
                    "src": "2315:29:15"
                  }
                ],
                "id": 4940,
                "name": "Block",
                "src": "2305:46:15"
              }
            ],
            "id": 4941,
            "name": "FunctionDefinition",
            "src": "2185:166:15"
          },
          {
            "attributes": {
              "constant": true,
              "implemented": true,
              "isConstructor": false,
              "modifiers": [
                null
              ],
              "name": "isNotAuthorized",
              "payable": false,
              "scope": 4970,
              "stateMutability": "view",
              "superFunction": null,
              "visibility": "internal"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "self",
                      "scope": 4957,
                      "stateVariable": false,
                      "storageLocation": "storage",
                      "type": "struct PermissionsLib.Permissions storage pointer",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "contractScope": null,
                          "name": "Permissions",
                          "referencedDeclaration": 4804,
                          "type": "struct PermissionsLib.Permissions storage pointer"
                        },
                        "id": 4942,
                        "name": "UserDefinedTypeName",
                        "src": "2382:11:15"
                      }
                    ],
                    "id": 4943,
                    "name": "VariableDeclaration",
                    "src": "2382:24:15"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "agent",
                      "scope": 4957,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 4944,
                        "name": "ElementaryTypeName",
                        "src": "2408:7:15"
                      }
                    ],
                    "id": 4945,
                    "name": "VariableDeclaration",
                    "src": "2408:13:15"
                  }
                ],
                "id": 4946,
                "name": "ParameterList",
                "src": "2381:41:15"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "",
                      "scope": 4957,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "bool",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "bool",
                          "type": "bool"
                        },
                        "id": 4947,
                        "name": "ElementaryTypeName",
                        "src": "2470:4:15"
                      }
                    ],
                    "id": 4948,
                    "name": "VariableDeclaration",
                    "src": "2470:4:15"
                  }
                ],
                "id": 4949,
                "name": "ParameterList",
                "src": "2469:6:15"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "functionReturnParameters": 4949
                    },
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "!",
                          "prefix": true,
                          "type": "bool"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "isStructConstructorCall": false,
                              "lValueRequested": false,
                              "names": [
                                null
                              ],
                              "type": "bool",
                              "type_conversion": false
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": [
                                    {
                                      "typeIdentifier": "t_struct$_Permissions_$4804_storage_ptr",
                                      "typeString": "struct PermissionsLib.Permissions storage pointer"
                                    },
                                    {
                                      "typeIdentifier": "t_address",
                                      "typeString": "address"
                                    }
                                  ],
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 4941,
                                  "type": "function (struct PermissionsLib.Permissions storage pointer,address) view returns (bool)",
                                  "value": "isAuthorized"
                                },
                                "id": 4950,
                                "name": "Identifier",
                                "src": "2498:12:15"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 4943,
                                  "type": "struct PermissionsLib.Permissions storage pointer",
                                  "value": "self"
                                },
                                "id": 4951,
                                "name": "Identifier",
                                "src": "2511:4:15"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 4945,
                                  "type": "address",
                                  "value": "agent"
                                },
                                "id": 4952,
                                "name": "Identifier",
                                "src": "2517:5:15"
                              }
                            ],
                            "id": 4953,
                            "name": "FunctionCall",
                            "src": "2498:25:15"
                          }
                        ],
                        "id": 4954,
                        "name": "UnaryOperation",
                        "src": "2497:26:15"
                      }
                    ],
                    "id": 4955,
                    "name": "Return",
                    "src": "2490:33:15"
                  }
                ],
                "id": 4956,
                "name": "Block",
                "src": "2480:50:15"
              }
            ],
            "id": 4957,
            "name": "FunctionDefinition",
            "src": "2357:173:15"
          },
          {
            "attributes": {
              "constant": true,
              "implemented": true,
              "isConstructor": false,
              "modifiers": [
                null
              ],
              "name": "getAuthorizedAgents",
              "payable": false,
              "scope": 4970,
              "stateMutability": "view",
              "superFunction": null,
              "visibility": "internal"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "self",
                      "scope": 4969,
                      "stateVariable": false,
                      "storageLocation": "storage",
                      "type": "struct PermissionsLib.Permissions storage pointer",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "contractScope": null,
                          "name": "Permissions",
                          "referencedDeclaration": 4804,
                          "type": "struct PermissionsLib.Permissions storage pointer"
                        },
                        "id": 4958,
                        "name": "UserDefinedTypeName",
                        "src": "2565:11:15"
                      }
                    ],
                    "id": 4959,
                    "name": "VariableDeclaration",
                    "src": "2565:24:15"
                  }
                ],
                "id": 4960,
                "name": "ParameterList",
                "src": "2564:26:15"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "",
                      "scope": 4969,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address[] memory",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "length": null,
                          "type": "address[] storage pointer"
                        },
                        "children": [
                          {
                            "attributes": {
                              "name": "address",
                              "type": "address"
                            },
                            "id": 4961,
                            "name": "ElementaryTypeName",
                            "src": "2638:7:15"
                          }
                        ],
                        "id": 4962,
                        "name": "ArrayTypeName",
                        "src": "2638:9:15"
                      }
                    ],
                    "id": 4963,
                    "name": "VariableDeclaration",
                    "src": "2638:9:15"
                  }
                ],
                "id": 4964,
                "name": "ParameterList",
                "src": "2637:11:15"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "functionReturnParameters": 4964
                    },
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "member_name": "authorizedAgents",
                          "referencedDeclaration": 4803,
                          "type": "address[] storage ref"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 4959,
                              "type": "struct PermissionsLib.Permissions storage pointer",
                              "value": "self"
                            },
                            "id": 4965,
                            "name": "Identifier",
                            "src": "2670:4:15"
                          }
                        ],
                        "id": 4966,
                        "name": "MemberAccess",
                        "src": "2670:21:15"
                      }
                    ],
                    "id": 4967,
                    "name": "Return",
                    "src": "2663:28:15"
                  }
                ],
                "id": 4968,
                "name": "Block",
                "src": "2653:45:15"
              }
            ],
            "id": 4969,
            "name": "FunctionDefinition",
            "src": "2536:162:15"
          }
        ],
        "id": 4970,
        "name": "ContractDefinition",
        "src": "610:2090:15"
      }
    ],
    "id": 4971,
    "name": "SourceUnit",
    "src": "584:2117:15"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.18+commit.9cf6e910.Emscripten.clang"
  },
  "networks": {
    "42": {
      "events": {},
      "links": {},
      "address": "0xf27630a3f3e38cfc3eb2edca884b0e35c4b94cc2"
    },
    "70": {
      "events": {},
      "links": {},
      "address": "0xc13d026d7e4e6c2864240aa1f26bb436c6271338"
    }
  },
  "schemaVersion": "1.0.1",
  "updatedAt": "2018-03-05T04:42:11.003Z"
}