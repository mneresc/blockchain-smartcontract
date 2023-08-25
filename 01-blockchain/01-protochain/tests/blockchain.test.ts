import {describe, expect, beforeEach, it} from '@jest/globals';
import BlockChain from '../src/lib/blockchain';
import Block from '../src/lib/block';

// create test to blockchainclass
describe('BlockChain', () => {
    let blockchain: BlockChain;

    beforeEach(() => {
        blockchain = new BlockChain();
    });

    it('should has genesis block', () => {
        expect(blockchain.blocks.length).toBe(1);
    });

    it('should add a new block', () => {
        blockchain.addBlock(new Block(1, blockchain.blocks[0].hash, 'data'));
        expect(blockchain.blocks.length).toBe(2);
    });

    it('should be a valid blockchain', () => {
        blockchain.addBlock(new Block(1, blockchain.blocks[0].hash, 'data'));
        expect(blockchain.isValid().success).toBe(true);
    });

    it('should be an invalid blockchain', () => {
        blockchain.addBlock(new Block(1, blockchain.blocks[0].hash, 'data'));
        blockchain.blocks[0] = new Block(1, blockchain.blocks[0].hash, 'invalid data');
        expect(blockchain.isValid().success).toBe(false);
    });

    it('should add a new invalid block', () => {
        blockchain.addBlock(new Block(1, blockchain.blocks[0].hash, 'data'));
        blockchain.addBlock(new Block(1, blockchain.blocks[0].hash, 'invalid data'));
        expect(blockchain.blocks.length).toBe(2);
    });

    it('should get a block by hash', () => {
        const block = new Block(1, blockchain.blocks[0].hash, 'data');
        blockchain.addBlock(block);
        expect(blockchain.getBlock(block.hash)).toBe(block);
    });


});
