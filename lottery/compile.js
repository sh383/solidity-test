//instead of using require(./contracts/inbox.sol)
const path = require("path"); //cross platform compatibility
const fs = require("fs");
const solc = require("solc");

const lotteryPath = path.resolve(__dirname, "contracts", "Lottery.sol"); //current working directory
const source = fs.readFileSync(lotteryPath, "utf8"); //read raw source file

const input = {
  language: "Solidity",
  sources: {
    "Lottery.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};
const output = JSON.parse(solc.compile(JSON.stringify(input)));
// module.exports = solc.compile(source, 1).contracts[":Lottery"];
module.exports = output.contracts["Lottery.sol"].Lottery;
