import axios from "axios";
import { BlockInfo } from "../lib/interfaces/blockinfo";
import Block from "../lib/block";

type MinnerKey = {
    publicKey: string;
    privateKey: string;
}

export default class MinnerClient{
    static ENDPOINT = 'http://localhost:3000';
    static mineWallet: MinnerKey = {
        publicKey:"hi",
        privateKey:"123456"

    };

    static totalMined = 0;
    static async mine(){
        console.log('Next block info')
        const {data} = await axios.get(`${MinnerClient.ENDPOINT}/blocks/next`);
        const blockInfo = data as BlockInfo;
        const nwBlock =  Block.fromBlockInfo(blockInfo);

        console.log('Mining block #' + nwBlock.index);

        nwBlock.mine(blockInfo.difficulty, MinnerClient.mineWallet.publicKey);

        console.log('Mined block #' + nwBlock.index);

        try {
            const { data } = await axios.post(`${MinnerClient.ENDPOINT}/blocks`, nwBlock);
            console.log('Block #' + nwBlock.index + ' added to chain');
            console.log(data);
        } catch (err: any) {
            console.error(err.response.data ? err.response.data.message : err.message);
        }

        console.log('Total mined: ' + ++MinnerClient.totalMined)

        setTimeout(MinnerClient.mine, 1000);

        /**
         * @TODO: adicionar tx de recompensa
         */
    }

}
