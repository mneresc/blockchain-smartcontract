import {describe, expect, beforeEach, it} from '@jest/globals';
import BlockChain from '../src/lib/blockchain';
import Block from '../src/lib/block';
let blockchain: BlockChain;

// create test to blockchainclass
describe('BlockChain', () => {

    beforeEach(() => {
        blockchain = new BlockChain();
    });

    it('should has genesis block', () => {
        expect(blockchain.blocks.length).toBe(1);
    });

    it('should add a new block', () => {
        const block = new Block({ index: 1, previousHash: blockchain.blocks[0].hash, data: 'data', nonce: 1, mappedBy: 'me' } as unknown as Block);
        block.mine(blockchain.getDificulty(),'me')
        blockchain.addBlock(block);
        expect(blockchain.blocks.length).toBe(2);
    });

    it('should be a valid blockchain', () => {
        blockchain.addBlock(new Block({ index: 1, previousHash: blockchain.blocks[0].hash, data: 'data', nonce: 1, mappedBy: '' } as unknown as Block));
        expect(blockchain.isValid().success).toBe(true);
    });

    // it('should be an invalid blockchain', () => {
    //     blockchain.addBlock(new Block({ index: 1, previousHash: blockchain.blocks[0].hash, data: 'data', nonce: 1, mappedBy: 'me' } as unknown as Block));
    //     const block = new Block({index: 1, previousHash: blockchain.blocks[0].hash, data:'invalid data', nonce: null, mappedBy: null} as unknown as Block);
    //     block.mine(blockchain.getDificulty(),'me')
    //     blockchain.blocks[0] = block;
    //     expect(blockchain.isValid().success).toBe(false);
    // });

    it('should add a new invalid block', () => {
        const block = new Block({ index: 1, previousHash: blockchain.blocks[0].hash, data: 'data', nonce: 1, mappedBy: 'me' } as unknown as Block);
        block.mine(blockchain.getDificulty(),'me')

        blockchain.addBlock(block);
        blockchain.addBlock(new Block({index: 1, previousHash: blockchain.blocks[0].hash, data:'invalid data'} as Block));


        expect(blockchain.blocks.length).toBe(2);
    });

    it('should get a block by hash', () => {
        const block = new Block({ index: 1, previousHash: blockchain.blocks[0].hash, data: 'data', nonce: 1, mappedBy: 'me' } as unknown as Block);
        block.mine(blockchain.getDificulty(),'me')
        blockchain.addBlock(block);
        expect(blockchain.getBlock(block.hash)).toBe(block);
    });

    it('should get nwxt block info', () => {
        const blockInfo = blockchain.getNextBlock();
        expect(blockInfo.index).toBe(1);
        expect(blockInfo.previousHash).toBe(blockchain.blocks[0].hash);
        expect(blockInfo.difficulty).toBe(blockchain.getDificulty());
        expect(blockInfo.maxDifficulty).toBe(BlockChain.MAX_DIFICULT);
        expect(blockInfo.feePerTx).toBe(1);
    });


});
