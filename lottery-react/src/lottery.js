import web3 from "./web3";

const address = "0xE3Bf6CfD247ba56B70f0737340371b3c5461E0F7";

const abi = [
  // etherscan 에 sourcecode 를 입력해서 찾아야 함. console.log(interface) 에서 얻어지는 정보와 다름.
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    inputs: [],
    name: "enter",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getPlayers",
    outputs: [
      { internalType: "address payable[]", name: "", type: "address[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "manager",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pickWinner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "players",
    outputs: [{ internalType: "address payable", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
];

export default new web3.eth.Contract(abi, address); // blockchain 의 우리 contract 에 access 할 수 있는 portal
