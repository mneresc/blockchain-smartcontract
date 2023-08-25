import express from 'express';
import morgan from 'morgan';
import BlockChain from '../lib/blockchain';

const app = express();
app.use(morgan('dev'));
app.use(express.json());

const blockchain = new BlockChain();

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

app.get('/status', (req, res) => {
    res.json({ status: blockchain.isValid().success, blocks: blockchain.blocks.length, lastBlock: blockchain.getLastBlock() });
});

app.get('/blocks/:indexOrHash', (req, res) => {
    if (isNaN(req.params.indexOrHash as any)) {
        const block = blockchain.getBlock(req.params.indexOrHash);
        if (block) {
            return res.json(block);
        } else {
            return res.status(404).json('block not found');
        }
    }

    return res.json(blockchain.blocks[parseInt(req.params.indexOrHash)]);
});
