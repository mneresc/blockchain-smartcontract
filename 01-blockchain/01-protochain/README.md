# Protochain

Protótipo de block chain

- Rodar local

```bash
# copie o arquivo docker-compose.example para docker-compose.yml na pasta de infra e rode o composer

$ mv ../../infra/docker-compose.example  ../../infra/docker-compose.yml

#na pasta infra rode o compose

$ docker-compose up

#sobe o servidor da protoblockchain
$ npm run blockchain

#some a simulação de mineração
$ npm run mine

# create a wallet
$ npm run generate-wallet

```
