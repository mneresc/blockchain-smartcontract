import {describe, expect, beforeEach, it} from '@jest/globals';
import TxInput from '../src/lib/transaction-input';
import Wallet from '../src/lib/wallet';

describe('TxInput', () =>{


    const mockWallets = {
        alice: new Wallet(),
        bob: new Wallet()
    }

    const mockTxInput: TxInput = {
        fromAddress: mockWallets.alice.publicKey,
        amount: 10
    } as TxInput;

    it('Should create a valid TxInput object', () => {
        const txInput = new TxInput(mockTxInput);
        txInput.sing(mockWallets.alice.privateKey);
        expect(txInput.isValid().success).toBe(true);
    })

    it('Should create a invalid TxInput object', () => {
        const txInput = new TxInput(mockTxInput);
        txInput.sing(mockWallets.bob.privateKey);
        expect(txInput.isValid().success).toBe(false);
    })

})
