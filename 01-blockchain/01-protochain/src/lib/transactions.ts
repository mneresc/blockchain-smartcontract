import sha256 from 'crypto-js/sha256';
import TransactionType from './interfaces/transaction-type';
import Validation from './validation';
import TxInput from './transaction-input';

export default class Transaction {
    type: TransactionType;
    timestamp: number;
    txInput: TxInput;
    hash: string;
    to: string;


    constructor(tx?: Transaction) {
        this.type = tx?.type || TransactionType.REGULAR;
        this.timestamp = tx?.timestamp || Date.now();
        this.to = tx?.to || '';
        this.hash = tx?.hash || this.getHash();
        this.txInput = tx?.txInput || new TxInput();
    }



    getHash(): string {
        return sha256(this.type + this.timestamp + this.to + this.txInput.getHash()).toString();
    }

    isValid(): Validation {
        if(this.hash !== this.getHash()) {
            return new Validation(false, 'Invalid hash');
        }

        return new Validation(true);
    }
}
