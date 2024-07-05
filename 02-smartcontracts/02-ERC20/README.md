# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```
# Eventos
* Sao opcionais e é enviado para a blockchain quando uma acao e executada, uma especie de log. Transferencias de ERC20 geralmente emitem evento de transferencia por recomendacao, por exemplo.

# Transferencia delegada

Delega permissao de transferencia para outra pessoa ou contrato
Pode vender meus tokens por mim, dentro de um limite preestabelecido
Deve ter uma funcao de aprovacao para isso
