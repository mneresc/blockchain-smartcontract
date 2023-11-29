// SPDX-License-Identifier: MIT

 pragma solidity ^0.8.12;

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

 contract ParOuImpar {

    string public choicePlayer1 = '';
    address public player1;
    uint8 public numberPlayer1;
    string public status = '';




    // pure not write or read from blockchain
    function compare(string memory needed, string memory expected) private pure returns (bool){
        bytes memory arrNeeded = bytes(needed);
        bytes memory arrExpected = bytes(expected);
        return arrNeeded.length == arrExpected.length && keccak256(arrNeeded) == keccak256(arrExpected);
    }

    function choose(string memory newChoice) public {
        require(compare(newChoice, 'EVEN') || compare(newChoice, 'ODD'), 'choose a option: 1 = EVEN or 2 = ODD');

        string memory mensage  = string.concat('Player 1 already choose', choicePlayer1);

        require(compare(choicePlayer1, '')  , mensage);
        choicePlayer1 = newChoice;
        player1 = msg.sender;
        status = string.concat(' Player 1 is ', Strings.toHexString(player1), ' and choose ', choicePlayer1);
    }

    function play(uint8 number) public {
        require(!compare(choicePlayer1, '')  , 'choose a option first: EVEN or 2 ODD');
        require(number > 0, 'choose number grater then zero');

        if(player1 == msg.sender){
            numberPlayer1 = number;
            status = string.concat(' Player 1 already plays');
        }else{
            require(numberPlayer1 != 0, 'Player 1 plays first');

            status = string.concat('Player 1 and choose ', choicePlayer1, ' and plays ', Strings.toString(numberPlayer1) , ' Player 2 plays ', Strings.toString(number));

            bool isEven = (number + numberPlayer1) % 2 == 0 ;

            string memory mensage = string.concat('Player 1 choose ',choicePlayer1, ' and plays ',Strings.toString(numberPlayer1),' and Player 2 ', Strings.toString(number));

            if(isEven && compare(choicePlayer1, 'EVEN') ){
                status = string.concat(mensage, ' Player 1 WINs');
            }else if (!isEven && compare(choicePlayer1, 'ODD')){
                status =  string.concat(mensage, ' Player 1 WINs');
            }else{
                status =  string.concat(mensage, ' Player 2 WINs');
            }
            // clean players
            choicePlayer1 = '';
            player1 = address(0);
            numberPlayer1 = 0;
        }

    }

 }
