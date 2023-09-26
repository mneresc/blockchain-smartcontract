import {describe, expect, beforeEach, it} from '@jest/globals';
import BlockChain from '../src/lib/blockchain';
import Block from '../src/lib/block';
import Transaction from '../src/lib/transactions';
import TransactionType from '../src/lib/interfaces/transaction-type';
import Wallet from '../src/lib/wallet';
import TxInput from '../src/lib/transaction-input';
let blockchain: BlockChain;

// create test to blockchainclass
describe('BlockChain', () => {
    let transactions: Transaction[];
    const mockWallets = {
        alice: new Wallet(),
        bob: new Wallet()
    }

    const mockTxInput: TxInput = {
        fromAddress: mockWallets.alice.publicKey,
        amount: 10
    } as TxInput;


    beforeEach(() => {
        transactions = [
            new Transaction({
                type: TransactionType.FEE,
                data: 'Genesis block',
                txInput: mockTxInput
            } as unknown as Transaction),
        ];
        blockchain = new BlockChain();
    });

    it('should has genesis block', () => {
        expect(blockchain.blocks.length).toBe(1);
    });

    it('should add a new block', () => {
        const block = new Block({ index: 1, previousHash: blockchain.blocks[0].hash, transactions, nonce: 1, mappedBy: 'me' } as unknown as Block);
        block.mine(blockchain.getDificulty(),'me')
        blockchain.addBlock(block);
        expect(blockchain.blocks.length).toBe(2);
    });

    it('should be a valid blockchain', () => {
        blockchain.addBlock(new Block({ index: 1, previousHash: blockchain.blocks[0].hash, transactions: [], nonce: 1, mappedBy: '' } as unknown as Block));
        expect(blockchain.isValid().success).toBe(true);
    });

    it('should add a new invalid block', () => {
        const block = new Block({ index: 1, previousHash: blockchain.blocks[0].hash, data: 'data', nonce: 1, mappedBy: 'me' } as unknown as Block);
        block.mine(blockchain.getDificulty(),'me')

        blockchain.addBlock(block);
        blockchain.addBlock(new Block({index: 1, previousHash: blockchain.blocks[0].hash, transactions:[]} as unknown as Block));


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
        expect(blockInfo?.index).toBe(1);
        expect(blockInfo?.previousHash).toBe(blockchain.blocks[0].hash);
        expect(blockInfo?.difficulty).toBe(blockchain.getDificulty());
        expect(blockInfo?.maxDifficulty).toBe(BlockChain.MAX_DIFICULT);
        expect(blockInfo?.feePerTx).toBe(1);
    });

    it('should mempool has a invalid length', () => {
        blockchain.addTransaction(new Transaction({ type: TransactionType.FEE, data: 'data' } as unknown as Transaction));
        expect(blockchain.mempool.length).toBe(1);
    });

    it('should addTraansaction return a invalid transaction', () => {
        const transaction = new Transaction({ type: TransactionType.FEE, data: 'data', hash: 'a' } as unknown as Transaction);
        transaction.hash = 'invalid hash';
        expect(blockchain.addTransaction(transaction).success).toBe(false);
    });

    it('should addTraansaction return a already exists Transaction', () => {
        const transaction = new Transaction({ type: TransactionType.FEE, data: 'data', hash: 'a' } as unknown as Transaction);
        blockchain.addTransaction(transaction);
        expect(blockchain.addTransaction(transaction).success).toBe(false);
    });

    it('should addBlock return false', () => {
        const block = new Block({ index: 1, previousHash: blockchain.blocks[0].hash, data: 'data', nonce: 1, mappedBy: 'me' } as unknown as Block);

        const blockchainInvalid = new BlockChain();
        blockchainInvalid.mempool.push(new Transaction({ type: TransactionType.FEE, data: 'data', hash: 'a' } as unknown as Transaction));

        blockchainInvalid.addBlock(block);
        expect(blockchainInvalid.addBlock(block)).toBe(false);
    });


});
