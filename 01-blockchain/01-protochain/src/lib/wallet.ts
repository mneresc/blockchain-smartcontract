import * as ecc from 'tiny-secp256k1';
import ECPairFactory, {ECPairInterface} from 'ecpair';

const ECPair = ECPairFactory(ecc);


export default class Wallet {

    privateKey: string;
    publicKey: string;

    constructor(wifOrPrivateKey?: string){
        let keyPair: ECPairInterface;
        if(!wifOrPrivateKey){
            keyPair = ECPair.makeRandom();
        }else{
            try{
                keyPair = ECPair.fromWIF(wifOrPrivateKey);
            }catch(e){
                keyPair = ECPair.fromPrivateKey(Buffer.from(wifOrPrivateKey, 'hex'));
            }
        }

        this.privateKey = keyPair.privateKey?.toString('hex') || "";
        this.publicKey = keyPair.publicKey.toString('hex');
    }

}
