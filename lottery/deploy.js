const HDWalletProvider = require("truffle-hdwallet-provider");
// ethereum 세상과 연결 고리. 정보를 가져오기도 하고 network에 변화를 주기도 함
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

// 어떤 계정을 unlock 할 것인가
const provider = new HDWalletProvider(
  "fault gravity ivory huge virtual brain carry delay trade valve always all",
  "https://rinkeby.infura.io/v3/70671f50d1cf4ae8990be1fc339b39d1"
);

// const provider = window.ethereum;
// provider.enable();

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting", accounts[0]);
  //result 는 contract 의 instance
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: "0x" + bytecode, arguments: ["Hi there!"] }) // add 0x bytecode
    .send({ gas: 1000000, from: accounts[0] }); // remove 'gas'

  console.log("Contract deployed to", result.options.address);
};
deploy();
