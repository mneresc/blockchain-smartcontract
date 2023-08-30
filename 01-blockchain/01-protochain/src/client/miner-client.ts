import axios from "axios";

export class MinnerClient{
    static ENDPOINT = 'http://localhost:3000';

    static async mine(){
        const {data} = await axios.get(`${MinnerClient.ENDPOINT}/blocks/next`);
        console.log(data);
    }

}
