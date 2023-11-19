// SPDX-License-Identifier: MIT

 pragma solidity ^0.8.7;

 contract ParOuImpar {

    uint8 public choice = 0;
    uint256 private cpuNumber;
    bool private result;

    function choose(uint8 newChoice) public {
        require(newChoice == 1 || newChoice == 2, 'choose a option: 1 = Even or 2 = Odd');
        choice = newChoice;
    }

    function pseudoRandom() private view returns(uint256){
       return uint(keccak256(abi.encodePacked(block.timestamp, choice)));
    }

    function play(uint8 number) public returns(bool){
        require(choice != 0 , 'choose a option first: 1 = Even or 2 = Odd');

        cpuNumber = pseudoRandom();
        bool isEven = (number + cpuNumber) % 2 == 0 ;

        if(isEven && choice == 1){
            return result = true;
        }else if (!isEven && choice == 2){
            return result = true;
        }else{
            return result = false;
        }
    }

    function showCPUOption() public view returns(uint256){
        return cpuNumber;
    }

    function showResult() public view returns(bool){
        return result;
    }
 }
