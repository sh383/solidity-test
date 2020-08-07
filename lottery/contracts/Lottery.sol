// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0 <0.7.0;

contract Lottery {
    address public manager;
    address payable[] public players;

    constructor() public {
        // Whenever the transaction is sent, the constructor finds out who made it and allocates the sender's address to manager variable.
        // global variable which can be used in any function inside of our contract
        manager = msg.sender;
    }

    function enter() public payable {
        // After the requirement is fulfilled, the other parts of the function is executed.
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }

    // don't want anyone else to write or call this function
    function random() private view returns (uint256) {
        return
            uint256(
                keccak256(abi.encodePacked(block.difficulty, now, players))
            );
    }

    function pickWinner() public restricted {
        uint256 index = random() % players.length;
        players[index].transfer(address(this).balance);
        players = new address payable[](0);
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }
}
