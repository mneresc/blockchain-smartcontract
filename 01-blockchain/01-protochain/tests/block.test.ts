import { describe, expect, beforeEach, beforeAll, it } from '@jest/globals';
import Block from '../src/lib/block';

describe('Block', () => {
    let block: Block;
    let genesis: Block;

    beforeAll(() => {
        genesis = new Block(0, '', 'Genesis Block');
    });

    beforeEach(() => {
        block = new Block(1, genesis.hash, 'data');
        block.index = 1;
    });

    it('should be a valid block', () => {
        expect(block.isValid(genesis.hash, genesis.index)).toBe(true);
    });

    it('should be a invalid block', () => {
        block.index = -1;
        expect(block.isValid(genesis.hash, genesis.index)).toBe(false);
    });

    it('should be a invalid block', () => {
        expect(block.isValid('dasdsds', genesis.index)).toBe(false);
    });

    it('shold be a invalid block index', () => {
        block.index = -1;
        expect(block.isValid(genesis.hash, 0)).toBe(false);
    }  );

    it('shold be a invalid previous index', () => {
        expect(block.isValid(genesis.hash, -10)).toBe(false);
    }  );
});
