// SPDX-License-Identifier: MIT

 pragma solidity ^0.8.12;

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

 contract ParOuImpar {

    string public choice = '';

    // pure not write or read from blockchain
    function compare(string memory needed, string memory expected) private pure returns (bool){
        bytes memory arrNeeded = bytes(needed);
        bytes memory arrExpected = bytes(expected);
        return arrNeeded.length == arrExpected.length && keccak256(arrNeeded) == keccak256(arrExpected);
    }

    function choose(string memory newChoice) public {
        require(compare(newChoice, 'EVEN') || compare(newChoice, 'ODD'), 'choose a option: 1 = EVEN or 2 = ODD');
        choice = newChoice;
    }

    function pseudoRandom() private view returns(uint256){
       return uint(keccak256(abi.encodePacked(block.timestamp, choice)));
    }

    function play(uint8 number) public view returns(string memory){
        require(!compare(choice, '')  , 'choose a option first: EVEN or 2 ODD');

        uint256 cpuNumber = pseudoRandom();
        bool isEven = (number + cpuNumber) % 2 == 0 ;

        string memory mensage = string.concat('Players choose ',choice, ' and plays ',Strings.toString(number),' and CPU plays ', Strings.toString(cpuNumber));

        if(isEven && compare(choice, 'EVEN') ){
            return string.concat(mensage, ' Player WINs');
        }else if (!isEven && compare(choice, 'ODD')){
            return string.concat(mensage, ' Player WINs');
        }else{
            return string.concat(mensage, ' Looooooser');
        }
    }

 }
