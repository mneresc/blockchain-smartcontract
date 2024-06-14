# Hardhat

## Configurando hardhat

```bash
# Inicia projeto
npm init -y
npm i -D hardhat
npx hardhat init
```

```bash
npm i -D hardhat
```

```bash
npx hardhat compile
```

## Configurando ethereum nodes

* Principal: Geth/parity
* Remoto: infura, alchemy, moralis
* Local/Dev: Ganache

## Subir nó local

```bash
npx hardhat node
```
Adiciona na metamask uma rede manualmente com o ip que subiu o chain id: 31337
Depois adiciona uma conta - importar conta

Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

Account #7: 0x14dC79964da2C08b23698B3D3cc7Ca32193d9955 (10000 ETH)
Private Key: 0x4bbbf85ce3377467afe5d46f804f221813b2bb87f24d81f60f1fcdbf7cbf4356


## Deploying

* Cria um deploy script na pasta ingnition modules
* Cria rode uma instrucao de deployment parecida com o script do package de deploy:dev

```bash
npx hardhat ignition deploy ignition/modules/BookDatabase.ts --network local
```

## Console
* Posso dar comandos para o console

```bash
npx hardhat console
```

* Posso interagir com o contrato gerado

```javascript
const contract = await ethers.getContractAt("BooksDatabase","0x5fbdb2315678afecb367f032d93f642f64180aa3")
```

* Criando um livro com contrato books

```javascript
await contract.addBook({title:"O que vim fazer no mundo?", year:"1990"})
```

* Pega livro criado

```javascript
await contract.books(1)
```
* contrato de teste na sepolia https://sepolia.etherscan.io/address/0xa1Ab09Ec7c1106457E4C1223Eec601bdC7cB49cE
* Da pra usar o propio ether scam para testar


## verify

Verifica um contrato e criar opçoes de teste na sepolia veja comando verify:sepolia no package.json

```bash
npx hardhat verify --network sepolia 0xa1Ab09Ec7c1106457E4C1223Eec601bdC7cB49cE
```
# ERC20

Documentaçao: https://ethereum.org/pt/developers/docs/standards/tokens/erc-20/
Token Fungível: Nao sao tokens únicos
