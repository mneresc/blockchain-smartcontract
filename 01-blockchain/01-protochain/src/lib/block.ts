import sha256 from 'crypto-js/sha256';
import Validation from './validation';
import { BlockInfo } from './interfaces/blockinfo';
import Transaction from './transactions';

export default class Block {
    index: number;
    hash: string;
    timestamp: number;
    previousHash: string;
    transactions: Transaction[];
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
        this.transactions = block?.transactions ? this.mapTransaction(block?.transactions) : [] as Transaction[];
        this.hash = block?.hash || this.getHash() ;
        this.nonce = block?.nonce || 0;
        this.minedBy = block?.minedBy || '';
    }

    mapTransaction(transaction: Transaction[]): Transaction[] {
        transaction.map(t => new Transaction(t));
        return transaction;
    }

    getHash(): string {
        const txs = this.transactions.map(t => t.hash).join('');
        return sha256(this.index + this.previousHash + this.timestamp + txs + this.nonce + this.minedBy).toString();
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

        if(this.transactions){

            if(this.transactions.filter(t => !t.isValid().success).length > 1){
                return new Validation(false, 'Invalid transaction - too many fees');
            }

            const validations = this.transactions.map(t => t.isValid());
            const error = validations.filter(v => !v.success).map(v => v.message).join(',');
            if(error){
                return new Validation(false, error);
            }
        }

        if (this.index < 1) {
            return new Validation(false, 'Invalid index');
        }

        if (this.previousHash !== previousHash) {
            return new Validation(false, 'Invalid previous hash');
        }

        if (this.index !== previousIndex + 1) {
            return new Validation(false, 'Invalid index - index not match');
        }

        const prefix = new Array(difficulty + 1).join('0');

        if (this.hash.substring(0, difficulty) !== prefix && this.hash !== this.getHash()) {
            return new Validation(false, 'Invalid hash - hash not match');
        }

        return new Validation();
    }

    static fromBlockInfo(blockInfo: BlockInfo): Block {
        const block = new Block();
        block.index = blockInfo.index;
        block.previousHash = blockInfo.previousHash;
        block.transactions = blockInfo.transactions;

        return block;
    }
}
