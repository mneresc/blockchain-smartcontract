import sha256 from 'crypto-js/sha256';
import Validation from './validation';

export default class Block {
    index: number;
    readonly hash: string;
    timestamp: number;
    previousHash: string;
    data: string;

    /**
     * Block constructor
     * @param index block index
     * @param previousHash previous block hash
     * @param data block data
     */
    constructor(block?: Block) {
        this.index = block?.index || 0;
        this.timestamp = block?.timestamp || Date.now();
        this.previousHash = block?.previousHash || '';
        this.data = block?.data || '';

        this.hash = block?.hash || this.getHash() ;
    }

    getHash(): string {
        return sha256(this.index + this.previousHash + this.timestamp + this.data).toString();
    }

    /**
     * Check if block is valid
     * @returns {boolean} true if block is valid
     */
    isValid(previousHash: string, previousIndex: number): Validation {

        if (this.index < 1) {
            return new Validation(false, 'Invalid index');
        }

        if (this.previousHash !== previousHash) {
            return new Validation(false, 'Invalid previous hash');
        }

        if (this.index !== previousIndex + 1) {
            return new Validation(false, 'Invalid index - index not match');
        }

        return new Validation();
    }
}
