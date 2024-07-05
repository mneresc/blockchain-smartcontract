// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract MeuDinheirinho {
    string public name = "MeuDinheirinho";
    string public symbol = "MDH";
    uint8 public decimals = 18;
    uint256 public totalSupply = 1000000 * 10**decimals;
    mapping(address => uint256) private _balances;

    // mapping is used as a data structure to store data in the smart contract and retrieve it later
    /**
     * Da carteira 0x0 a carteira 0x1 pode transferir 10 e a carteira 0x2 pode transferir 20
     * 0x0
     *  0x1 => 10
     *  0x2 => 20
     */
    mapping(address => mapping(address => uint256)) private _allowences;

    // function name() public view returns (string)
    // function symbol() public view returns (string)
    // function decimals() public view returns (uint8)
    // function totalSupply() public view returns (uint256)
    // function transfer(address _to, uint256 _value) public returns (bool success)
    constructor() {
        _balances[msg.sender] = totalSupply;
    }

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    //consuulta saldo de owner
    function balanceOf(address _owner) public view returns (uint256 balance){
        return _balances[_owner];
    }

    //transferencia de token entre duas carteiras
    function transfer(address _to, uint256 _value) public returns (bool success){
        require(_balances[msg.sender] >= _value, "Not enough balance");
        //tira de um e da para o outro
        _balances[msg.sender] -= _value;
        _balances[_to] += _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    }

    //transferencia delegado
    /**
     *  Aprovacoes devem ser armazenadas no contrato
     * @param _spender Quem vai gastar os tokens
     * @param _value Quanto autorizo que ele gaste
     */
    function approve (address _spender, uint256 _value) public returns (bool success){
        _allowences[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    /**
     * Retorna quantidade autorizada para ser gasta por aquele spender
     * @param _owner dono da carteira
     * @param _spender quem pode gastar
     */

    function allowence(address _owner, address _spender) public view returns (uint256){
        return _allowences[_owner][_spender];
    }

}
