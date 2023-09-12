import { describe, expect, beforeEach, beforeAll, it } from '@jest/globals';
import Block from '../src/lib/block';
import { BlockInfo } from '../src/lib/interfaces/blockinfo';
import TransactionType from '../src/lib/interfaces/transaction-type';
import Transaction from '../src/lib/transactions';

describe('Block', () => {
    let block: Block;
    let genesis: Block;
    const exampleDificult = 0;
    let transactions: Transaction[];

    beforeAll(() => {
        transactions = [
            new Transaction({
                type: TransactionType.FEE,
                data: 'Genesis block',
            } as Transaction),
        ];
        genesis = new Block({ index: 0, previousHash: '', transactions: transactions } as unknown as Block);
    });

    beforeEach(() => {
        block = new Block({index:1, previousHash: genesis.hash, transactions, nonce: 1, minedBy: 'abc'} as Block);
        block.index = 1;
    });

    it('should be a valid block', () => {
        expect(block.isValid(genesis.hash, genesis.index, exampleDificult).success).toBe(true);
    });

    it('should be a invalid block', () => {
        block.index = -1;
        expect(block.isValid(genesis.hash, genesis.index, exampleDificult).success).toBe(false);
    });

    it('should be a invalid block', () => {
        expect(block.isValid('dasdsds', genesis.index).success).toBe(false);
    });

    it('shold be a invalid block index', () => {
        block.index = -1;
        expect(block.isValid(genesis.hash, 0, exampleDificult).success).toBe(false);
    }  );

    it('shold be a invalid previous index', () => {
        expect(block.isValid(genesis.hash, -10, exampleDificult).success).toBe(false);
    }  );

    it('should be valid empty block', () => {
        const block = new Block();
        expect(block.isValid(genesis.hash, genesis.index, exampleDificult).success).toBe(false);
    });

    it('should be generare block fromBlockInfo' ,() => {
        const blockInfo: BlockInfo = {
            index: 1,
            previousHash: '123',
            difficulty: 1,
            maxDifficulty: 5,
            feePerTx: 1,
            transactions: [],
        };

        const block = Block.fromBlockInfo(blockInfo);

        expect(block.index).toBe(1);
        expect(block.previousHash).toBe('123');
    });
});
