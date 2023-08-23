import Block from './block';

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
        if (!block.isValid(lastBlock.hash, lastBlock.index)) {
            return false;
        }

        this.blocks.push(block);
        this.nextIndex++;
        return true;
    }

    isValid(): boolean {
        for (let i = 1; i < this.blocks.length; i++) {
            const currentBlock = this.blocks[i];
            const previousBlock = this.blocks[i - 1];
            if (!currentBlock.isValid(previousBlock.hash, previousBlock.index)) {
                return false;
            }
        }
        return true;
    }
}
