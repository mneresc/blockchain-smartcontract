import {describe, expect, beforeEach, it} from '@jest/globals';
import BlockChain from '../src/lib/blockchain';

// create test to blockchainclass
describe('BlockChain', () => {
    let blockchain: BlockChain;

    beforeEach(() => {
        blockchain = new BlockChain();
    });

    it('should has genesis block', () => {
        expect(blockchain.blocks.length).toBe(1);
    });
});
