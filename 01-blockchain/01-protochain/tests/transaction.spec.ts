import {describe, expect, beforeEach, it} from '@jest/globals';
import TransactionType from "../src/lib/interfaces/transaction-type";
import Transaction from "../src/lib/transactions";

describe('Transaction', () => {

    // should be test Transaction class
    it('should be a valid transaction', () => {
        const transaction = new Transaction({type: TransactionType.REGULAR, data: 'data'} as Transaction);
        expect(transaction.isValid().success).toBe(true);
    })

    it('should be a invalid hash transaction', () => {
        const transaction = new Transaction({type: TransactionType.REGULAR, data: 'data'} as Transaction);
        transaction.hash = 'invalid hash';
        expect(transaction.isValid().success).toBe(false);
    }
    )

    it('should be a a valid transation with all data filled', () => {
        const transaction = new Transaction({type: TransactionType.REGULAR, data: 'data'} as Transaction);
        expect(transaction.isValid().success).toBe(true);
    }
    )

    it('should be a valid transation with all data filled', () => {
        const transaction = new Transaction({type: TransactionType.FEE, data: 'data'} as Transaction);
        expect(transaction.isValid().success).toBe(true);
    })

    it('should be a empty transaction', () => {
        const transaction = new Transaction();
        expect(transaction.isValid().success).toBe(true);
    })

});
