// SPDX-License-Identifier: MIT

pragma solidity ^0.8.12;

library Strings {
    bytes16 private constant _HEX_SYMBOLS = "0123456789abcdef";
    uint8 private constant _ADDRESS_LENGTH = 20;

    /**
     * @dev Converts a `uint256` to its ASCII `string` decimal representation.
     */
    function toString(uint256 value) internal pure returns (string memory) {
        // Inspired by OraclizeAPI's implementation - MIT licence
        // https://github.com/oraclize/ethereum-api/blob/b42146b063c7d6ee1358846c198246239e9360e8/oraclizeAPI_0.4.25.sol

        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    /**
     * @dev Converts a `uint256` to its ASCII `string` hexadecimal representation.
     */
    function toHexString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0x00";
        }
        uint256 temp = value;
        uint256 length = 0;
        while (temp != 0) {
            length++;
            temp >>= 8;
        }
        return toHexString(value, length);
    }

    /**
     * @dev Converts a `uint256` to its ASCII `string` hexadecimal representation with fixed length.
     */
    function toHexString(uint256 value, uint256 length) internal pure returns (string memory) {
        bytes memory buffer = new bytes(2 * length + 2);
        buffer[0] = "0";
        buffer[1] = "x";
        for (uint256 i = 2 * length + 1; i > 1; --i) {
            buffer[i] = _HEX_SYMBOLS[value & 0xf];
            value >>= 4;
        }
        require(value == 0, "Strings: hex length insufficient");
        return string(buffer);
    }

    /**
     * @dev Converts an `address` with fixed length of 20 bytes to its not checksummed ASCII `string` hexadecimal representation.
     */
    function toHexString(address addr) internal pure returns (string memory) {
        return toHexString(uint256(uint160(addr)), _ADDRESS_LENGTH);
    }
}

contract PvPParOuImpar {

    string public choicePlayer1 = '';
    address public player1;
    uint8 public numberPlayer1;
    string public status = '';
    address payable private immutable owner;

    constructor(){
        owner = payable(msg.sender);
    }

    // pure not write or read from blockchain
    function compare(string memory needed, string memory expected) private pure returns (bool){
        bytes memory arrNeeded = bytes(needed);
        bytes memory arrExpected = bytes(expected);
        return arrNeeded.length == arrExpected.length && keccak256(arrNeeded) == keccak256(arrExpected);
    }

    function getBalance() public view returns(uint)
    {
        return address(this).balance;
    }


    function choose(string memory newChoice) public {
        require(compare(newChoice, 'EVEN') || compare(newChoice, 'ODD'), 'choose a option: 1 = EVEN or 2 = ODD');

        string memory mensage  = string.concat('Player 1 already choose', choicePlayer1);

        require(compare(choicePlayer1, '')  , mensage);
        choicePlayer1 = newChoice;
        player1 = msg.sender;
        status = string.concat(' Player 1 is ', Strings.toHexString(player1), ' and choose ', choicePlayer1);
    }

    function transferReward(address winner) private{
        address contractAddress = address(this);
        owner.transfer(contractAddress.balance / 100 * 50);
        payable(winner).transfer(contractAddress.balance);

    }

    function play(uint8 number) public payable {
        require(!compare(choicePlayer1, '')  , 'choose a option first: EVEN or 2 ODD');
        require(number > 0, 'choose number grater then zero');
        require(msg.value >= 0.0001 ether, 'Pague doido.');

        if(player1 == msg.sender){
            numberPlayer1 = number;
            status = string.concat('Player 1 already plays');
        }else{
            require(numberPlayer1 != 0, 'Player 1 plays first');

            status = string.concat('Player 1 and choose ', choicePlayer1, ' and plays ', Strings.toString(numberPlayer1) , ' Player 2 plays ', Strings.toString(number));

            bool isEven = (number + numberPlayer1) % 2 == 0 ;

            string memory mensage = string.concat('Player 1 choose ',choicePlayer1, ' and plays ',Strings.toString(numberPlayer1),' and Player 2 ', Strings.toString(number));

            if(isEven && compare(choicePlayer1, 'EVEN') ){
                status = string.concat(mensage, ' Player 1 WINs');
                transferReward(player1);
            }else if (!isEven && compare(choicePlayer1, 'ODD')){
                status =  string.concat(mensage, ' Player 1 WINs');
                transferReward(player1);
            }else{
                status =  string.concat(mensage, ' Player 2 WINs');
                transferReward(msg.sender);
            }
            // clean players
            choicePlayer1 = '';
            player1 = address(0);
            numberPlayer1 = 0;
        }

    }

 }
