import * as ecc from 'tiny-secp256k1';
import ECPairFactory, {ECPairAPI, ECPairInterface} from 'ecpair';
import sha256 from 'crypto-js/sha256';
import Validation from './validation';


export default class TxInput{
    fromAddress: string;
    amount: number;
    signature: string;
    ECPair: ECPairAPI;

    constructor(txInput?: TxInput){
        this.fromAddress = txInput?.fromAddress || "";
        this.amount = txInput?.amount || 0;
        this.signature = txInput?.signature || "";
        this.ECPair = ECPairFactory(ecc);


    }

    sing(privateKey: string): void {
        this.signature =  this.ECPair.fromPrivateKey(Buffer.from(privateKey, 'hex'))
        .sign(Buffer.from(this.getHash(),'hex'))
        .toString('hex');
    }

    getHash(): string{
        return sha256(this.fromAddress+this.amount).toString();
    }

    isValid(): Validation{
        if(!this.signature){
            return new Validation(false, "No signature");
        }

        if(this.amount < 1){
            return new Validation(false, "Invalid amount");
        }

        const isValidSig = this.ECPair.fromPublicKey(Buffer.from(this.fromAddress, 'hex'))
        .verify(Buffer.from(this.getHash(),'hex'), Buffer.from(this.signature,'hex'))
        if(!isValidSig){
            return new Validation(false, "Invalid signature");
        }

        return new Validation(true);
    }

}
