import sha256 from 'crypto-js/sha256';

export default class Block {
    index: number;
    hash: string;
    timestamp: number;
    previousHash: string;
    data: string;

    /**
     * Block constructor
     * @param index block index
     * @param previousHash previous block hash
     * @param data block data
     */
    constructor(index: number, previousHash: string, data: string) {
        this.index = index;
        this.timestamp = Date.now();
        this.previousHash = previousHash;
        this.data = data;

        this.hash = this.getHash();
    }

    getHash(): string {
        return sha256(this.index + this.previousHash + this.timestamp + this.data).toString();
    }

    /**
     * Check if block is valid
     * @returns {boolean} true if block is valid
     */
    isValid(): boolean {
        if (this.index < 1) {
            return false;
        }

        if (!this.hash) {
            return false;
        }
        return true;
    }
}
