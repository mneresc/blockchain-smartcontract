import sha256 from 'crypto-js/sha256';
import Validation from './validation';

export default class Block {
    index: number;
    hash: string;
    timestamp: number;
    previousHash: string;
    data: string;
    nonce?: number;
    minedBy?: string;

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
        this.nonce = block?.nonce || 0;
        this.minedBy = block?.minedBy || '';
    }

    getHash(): string {
        return sha256(this.index + this.previousHash + this.timestamp + this.data + this.nonce + this.minedBy).toString();
    }

    /**
     * Generate a new block with the given difficulty
     * @param difficulty Get the hash of the block with the given difficulty
     * @param minedBy
     * @returns
     */
    mine(difficulty: number, minedBy: string): Block {
        this.minedBy = minedBy;
        this.nonce = 0;

        while (this.hash.substring(0, difficulty) !== new Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.getHash();
        }

        return this;
    }

    /**
     * Check if block is valid
     * @param previousHash previous block hash
     * @param previousIndex previous block index
     * @param difficulty difficulty
     * @returns {boolean} true if block is valid
     */
    isValid(previousHash: string, previousIndex: number, difficulty: number = 1): Validation {

        if (this.index < 1) {
            return new Validation(false, 'Invalid index');
        }

        if (this.previousHash !== previousHash) {
            return new Validation(false, 'Invalid previous hash');
        }

        if (this.index !== previousIndex + 1) {
            return new Validation(false, 'Invalid index - index not match');
        }

        if(!this.nonce && !this.minedBy) {
            return new Validation(false, 'Invalid nonce or minedBy');
        }

        const prefix = new Array(difficulty + 1).join('0');

        if (this.hash.substring(0, difficulty) !== prefix && this.hash !== this.getHash()) {
            return new Validation(false, 'Invalid hash - hash not match');
        }

        return new Validation();
    }
}
