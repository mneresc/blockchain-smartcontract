// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract HelloWorld {

    string public message = "My name is Slim Shady!";

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }

}
