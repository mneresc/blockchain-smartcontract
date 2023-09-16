import Block from './block';
import Validation from './validation';
import { BlockInfo } from './interfaces/blockinfo';
import Transaction from './transactions';
import TransactionType from './interfaces/transaction-type';

export default class BlockChain {
    blocks: Block[];
    mempool: Transaction[];
    nextIndex: number = 0;
    static readonly DIFFICULT_FACTOR = 5;
    static readonly MAX_DIFICULT = 62;
    static readonly TX_PER_BLOCK = 2;

    constructor() {
        this.mempool = [];
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

        const transactions = block.transactions.filter(tx => tx.type !== TransactionType.FEE).map(t => t.hash);

        const nwMempool =this.mempool.filter(t => !transactions.includes(t.hash));

        if (nwMempool.length !== this.mempool.length - transactions.length) {
            return false;
        }

        this.mempool = nwMempool;

        this.blocks.push(block);
        this.nextIndex++;
        return true;
    }

    addTransaction(transaction: Transaction): Validation {
        if (!transaction.isValid().success) {
            return new Validation(false, `Invalid transaction: reason ${transaction.isValid().message}`);
        }

        if(this.blocks.some(b => b.transactions.some(t => t.hash === transaction.hash))) {
            return new Validation(false, `Transaction already exists`);
        }


        this.mempool.push(transaction);
        return new Validation();
    }

    getBlock(hash: string): Block | undefined {
        return this.blocks.find(b => b.hash === hash);
    }

    getFeePerTx(): number {
        return 1;
    }



    getNextBlock(): BlockInfo  | null {
        if(this.mempool.length) {
            return null;
        }

        const transactions = this.mempool.splice(0, BlockChain.TX_PER_BLOCK);
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
