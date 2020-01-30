//instead of using require(./contracts/inbox.sol)
const path = require('path'); //cross platform compatibility
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol'); //current working directory
const source = fs.readFileSync(inboxPath, 'utf8'); //read raw source file 

module.exports = solc.compile(source, 1).contracts[':Inbox'];
