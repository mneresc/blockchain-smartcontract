import sha256 from 'crypto-js/sha256';
import TransactionType from './interfaces/transaction-type';
import Validation from './validation';

export default class Transaction {
    type: TransactionType;
    timestamp: number;
    data: string;
    hash: string;

    constructor(tx?: Transaction) {
        this.type = tx?.type || TransactionType.REGULAR;
        this.timestamp = tx?.timestamp || Date.now();
        this.data = tx?.data || '';
        this.hash = tx?.hash || this.getHash();
    }

    getHash(): string {
        return sha256(this.type + this.timestamp + this.data).toString();
    }

    isValid(): Validation {
        if(this.hash !== this.getHash()) {
            return new Validation(false, 'Invalid hash');
        }

        return new Validation(true);
    }
}
