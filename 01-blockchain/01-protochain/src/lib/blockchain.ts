import Block from './block';
import Validation from './validation';

export default class BlockChain {
    blocks: Block[];
    nextIndex: number = 0;

    constructor() {
        this.blocks = [new Block(0, '', 'Genesis Block')];
        this.nextIndex++;
    }

    getLastBlock(): Block {
        return this.blocks[this.blocks.length - 1];
    }

    addBlock(block: Block): boolean {
        const lastBlock = this.getLastBlock();
        if (!block.isValid(lastBlock.hash, lastBlock.index).success) {
            return false;
        }

        this.blocks.push(block);
        this.nextIndex++;
        return true;
    }

    getBlock(hash: string): Block | undefined {
        return this.blocks.find(b => b.hash === hash)
    }


    isValid(): Validation {
        for (let i = 1; i < this.blocks.length; i++) {
            const currentBlock = this.blocks[i];
            const previousBlock = this.blocks[i - 1];
            const blockValidation = currentBlock.isValid(previousBlock.hash, previousBlock.index)
            if (!blockValidation.success) {
                return new Validation(false, `Invalid block #${currentBlock.index}: reason ${blockValidation.message}`);
            }
        }
        return new Validation();
    }
}
