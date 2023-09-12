import Block from './block';
import Validation from './validation';
import { BlockInfo } from './interfaces/blockinfo';
import Transaction from './transactions';
import TransactionType from './interfaces/transaction-type';

export default class BlockChain {
    blocks: Block[];
    nextIndex: number = 0;
    static readonly DIFFICULT_FACTOR = 5;
    static readonly MAX_DIFICULT = 62;

    constructor() {
        const transactions = [
            new Transaction({
                type: TransactionType.FEE,
                data: 'Genesis block',
            } as Transaction),
        ];
        this.blocks = [new Block({ index: 0, previousHash: '', transactions: transactions } as unknown as Block)];
        this.nextIndex++;
    }

    getLastBlock(): Block {
        return this.blocks[this.blocks.length - 1];
    }

    getDificulty(): number {
        return Math.ceil(this.blocks.length / BlockChain.DIFFICULT_FACTOR);
    }

    addBlock(block: Block): boolean {
        const lastBlock = this.getLastBlock();
        if (!block.isValid(lastBlock.hash, lastBlock.index, this.getDificulty()).success) {
            return false;
        }

        this.blocks.push(block);
        this.nextIndex++;
        return true;
    }

    getBlock(hash: string): Block | undefined {
        return this.blocks.find(b => b.hash === hash);
    }

    getFeePerTx(): number {
        return 1;
    }

    getNextBlock(): BlockInfo {
        const transactions = [new Transaction({ data: Date.now().toString() } as Transaction)];

        const difficulty = this.getDificulty();
        const previousHash = this.getLastBlock().hash;
        const index = this.nextIndex;
        const feePerTx = this.getFeePerTx();

        return { index, previousHash, difficulty, maxDifficulty: BlockChain.MAX_DIFICULT, feePerTx, transactions };
    }

    isValid(): Validation {
        for (let i = 1; i < this.blocks.length; i++) {
            const currentBlock = this.blocks[i];
            const previousBlock = this.blocks[i - 1];
            const blockValidation = currentBlock.isValid(previousBlock.hash, previousBlock.index, this.getDificulty());
            if (!blockValidation.success) {
                return new Validation(false, `Invalid block #${currentBlock.index}: reason ${blockValidation.message}`);
            }
        }
        return new Validation();
    }
}
