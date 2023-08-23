import {describe, expect, beforeEach, it} from '@jest/globals';
import Block from '../src/lib/block';


describe('Block', () => {
    let block: Block;

    beforeEach(() => {
        block = new Block(1, '1234', 'data');
        block.index = 1;
        block.hash = '1234';
    });

    it('should be a valid block', () => {
        expect(block.isValid()).toBe(true);
    });

    it('should be a invalid block', () => {
        block.index = -1;
        expect(block.isValid()).toBe(false);
    });

    it('should be a invalid block', () => {
        block.hash = "";
        expect(block.isValid()).toBe(false);
    });
});
