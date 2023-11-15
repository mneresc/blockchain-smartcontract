// SPDX-License-Identifier: MIT

 pragma solidity ^0.8.7;

 contract HelloWorld {

    // internal (protected) | external - somente exteno não pode ser acesso dentro do proprio contrato - somente para funcoes
    string internal message = "Oh nao nasci aqui";

    //Assume o maior valor possível int256 ou uint - sem sinal
    //Nao tem numero flutuante - semrpe trabalha com a menor fração da moeda
    uint8 public age = 34;

    // outro exemplo 0xf650513248351332F16fDD35b65c4951520CeB74
    address private wallet = 0x07595EBa7783Ad3aaa64bA9577A99Af6Deb398D5;

    bool public isValid = false;

    enum Perfil {ADMIN, USER}

    Perfil public user = Perfil.ADMIN;

    // Funcoes

   function getAddress() public view returns(address) {
      return wallet;
   }

   function setAddress(address newWallet) public{
      wallet = newWallet;
   }

 }

