import {describe, expect, beforeEach, it} from '@jest/globals';
import TransactionType from "../src/lib/interfaces/transaction-type";
import Transaction from "../src/lib/transactions";
import Wallet from '../src/lib/wallet';
import TxInput from '../src/lib/transaction-input';

describe('Transaction', () => {
    const mockWallets = {
        alice: new Wallet(),
        bob: new Wallet()
    }

    const mockTxInput: TxInput = {
        fromAddress: mockWallets.alice.publicKey,
        amount: 10
    } as TxInput;

    const mockTx = { type: TransactionType.REGULAR, data: 'data' , txInput: mockTxInput} as unknown as Transaction;

    // should be test Transaction class
    it('should be a valid transaction', () => {
        const transaction = new Transaction();
        expect(transaction.isValid().success).toBe(true);
    })

    it('should be a invalid hash transaction', () => {
        const transaction = new Transaction(mockTx);
        transaction.hash = 'invalid hash';
        expect(transaction.isValid().success).toBe(false);
    }
    )

    it('should be a a valid transation with all data filled', () => {
        const transaction = new Transaction(mockTx);
        expect(transaction.isValid().success).toBe(true);
    }
    )

    it('should be a valid transation with all data filled', () => {
        const transaction = new Transaction({type: TransactionType.FEE, data: 'data'} as unknown as Transaction);
        expect(transaction.isValid().success).toBe(true);
    })

    it('should be a empty transaction', () => {
        const transaction = new Transaction();
        expect(transaction.isValid().success).toBe(true);
    })

});
