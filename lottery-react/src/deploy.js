const result = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({ data: "0x" + bytecode }) // add 0x bytecode
  .send({ from: accounts[0] }); // remove 'gas'
