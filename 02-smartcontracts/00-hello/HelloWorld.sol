// SPDX-License-Identifier: MIT

 pragma solidity ^0.8.7;

 contract HelloWorld {

    // internal (protected) | external - somente exteno não pode ser acesso dentro do proprio contrato

    string internal message = "Oh nao nasci aqui";

    //Assume o maior valor possível int256 ou uint - sem sinal
    //Nao tem numero flutuante - semrpe trabalha com a menor fração da moeda
    uint8 public age = 34;

    address public wallet = 0x07595EBa7783Ad3aaa64bA9577A99Af6Deb398D5;

    bool public isValida = false;

    enum Perfil {ADMIN, USER}

    Perfil public user = Perfil.ADMIN;

 }

