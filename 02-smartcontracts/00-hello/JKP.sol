// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

//Módulo 02 > Lição 03 > Tóps 08 e 09 - Contrato JoKenPo
contract JoKenPo {
    enum Options {
        NONE,
        ROCK,
        PAPER,
        SCISSORS
    } //0, 1, 2, 3

    Options private choice1 = Options.NONE;
    address private player1;
    string public result = "";
    address private immutable owner;

    constructor() {
        owner = msg.sender;
    }

    function update(string memory newResult) private {
        result = newResult;
        player1 = address(0);
        choice1 = Options.NONE;
    }

    // Ger contract balance
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // payable keyword permits a contract charges
    function play(Options newChoice) public payable {
        require(newChoice != Options.NONE, "Invalid choice");
        require(player1 != msg.sender, "Wait the another player.");
        require(msg.value >= 0.001 ether, "Invalid bid.");

        if (choice1 == Options.NONE) {
            player1 = msg.sender;
            choice1 = newChoice;
            result = "Player 1 choose his/her option. Waiting player 2.";
        } else if (choice1 == Options.ROCK && newChoice == Options.SCISSORS)
            update("Rock breaks scissors. Player 1 won.");
        else if (choice1 == Options.PAPER && newChoice == Options.ROCK)
            update("Paper wraps rock. Player 1 won.");
        else if (choice1 == Options.SCISSORS && newChoice == Options.PAPER)
            update("Scissors cuts paper. Player 1 won.");
        else if (choice1 == Options.SCISSORS && newChoice == Options.ROCK)
            update("Rock breaks scissors. Player 2 won.");
        else if (choice1 == Options.ROCK && newChoice == Options.PAPER)
            update("Paper wraps rock. Player 2 won.");
        else if (choice1 == Options.PAPER && newChoice == Options.SCISSORS)
            update("Scissors cuts paper. Player 2 won.");
        else update("Draw game.");
    }
}
