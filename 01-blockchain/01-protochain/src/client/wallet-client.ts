import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import readline from 'readline';
import Wallet from '../lib/wallet';
import Transaction from '../lib/transactions';
import TransactionType from '../lib/interfaces/transaction-type';
import TransactionInput from '../lib/transaction-input';
import TxInput from '../lib/transaction-input';


const BLOCKCHAIN_SERVER = process.env.BLOCKCHAIN_SERVER;

let myWalletPub = "";
let myWalletPriv = "";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function menu() {
    setTimeout(() => {
        console.clear();

        if (myWalletPub)
            console.log(`You are logged as ${myWalletPub}`);
        else
            console.log(`You aren't logged.`);

        console.log("1 - Create Wallet");
        console.log("2 - Recover Wallet");
        console.log("3 - Balance");
        console.log("4 - Send tx");
        console.log("5 - Search tx");
        rl.question("Choose your option: ", (answer) => {
            switch (answer) {
                case "1": createWallet(); break;
                case "2": recoverWallet(); break;
                case "3": getBalance(); break;
                case "4": sendTx(); break;
                case "5": searchTx(); break;
                default: {
                    console.log('Wrong option!');
                    menu();
                }
            }
        })

    }, 1000)
}

function preMenu() {
    rl.question(`Press any key to continue...`, () => {
        menu();
    })
}

function createWallet() {
    console.clear();
    const wallet = new Wallet();
    console.log(`Your new wallet:`);
    console.log(wallet);

    myWalletPub = wallet.publicKey;
    myWalletPriv = wallet.privateKey;
    preMenu();
}

function recoverWallet() {
    console.clear();
    rl.question(`What is your private key or WIF? `, (wifOrPrivateKey) => {
        const wallet = new Wallet(wifOrPrivateKey);
        console.log(`Your recovered wallet:`);
        console.log(wallet);

        myWalletPub = wallet.publicKey;
        myWalletPriv = wallet.privateKey;
        preMenu();
    })
}

async function getBalance() {
    console.clear();

    if (!myWalletPub) {
        console.log(`You don't have a wallet yet.`);
        return preMenu();
    }

    const { data } = await axios.get(`${BLOCKCHAIN_SERVER}wallets/${myWalletPub}`);
    console.log("Balance: " + data.balance);
    preMenu();
}

function sendTx() {
    console.clear();

    if (!myWalletPub) {
        console.log(`You don't have a wallet yet.`);
        return preMenu();
    }

    console.log(`Your wallet is ${myWalletPub}`);
    rl.question(`To Wallet: `, (toWallet) => {
        if (toWallet.length < 66) {
            console.log(`Invalid wallet.`);
            return preMenu();
        }

        rl.question(`Amount: `, async (amountStr) => {
            const amount = parseInt(amountStr);
            if (!amount) {
                console.log(`Invalid amount.`);
                return preMenu();
            }

            const tx = new Transaction();
            tx.to = toWallet;
            tx.type = TransactionType.REGULAR;
            tx.txInput = new TxInput({
                amount,
                fromAddress: myWalletPub
            } as TxInput)

            tx.txInput.sing(myWalletPriv)
            tx.hash = tx.getHash();
            console.log(tx);

            try {
                const txResponse = await axios.post(`${BLOCKCHAIN_SERVER}transactions/`, tx);
                console.log(`Transaction accepted. Waiting the miners!`);
                console.log(txResponse.data.hash);
            }
            catch (err: any) {
                console.error(err.response ? err.response.data : err.message);
            }

            return preMenu();
        })
    })

    preMenu();
}

function searchTx() {
    console.clear();
    rl.question(`Your tx hash: `, async (hash) => {
        const response = await axios.get(`${BLOCKCHAIN_SERVER}:3000/transactions/${hash}`);
        console.log(response.data);
        return preMenu();
    })
}

menu();


// Wallet {
//     privateKey: '2b3f862dddb414447c4a67ae3ed752e77ea3f9a195f78d5810a480b0a542604b',
//     publicKey: '034b8a459230d0862caae2734160340a9914b69baf0725b010f1d33c56fbe9fed2'
//   }
