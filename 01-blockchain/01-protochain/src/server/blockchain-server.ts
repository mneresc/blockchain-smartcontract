import express from 'express';
import morgan from 'morgan';
import BlockChain from '../lib/blockchain';
import Block from '../lib/block';

const app = express();
app.use(morgan('dev'));
app.use(express.json());

const blockchain = new BlockChain();

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

/**
 * get status of blockchain
 */
app.get('/status', (req, res) => {
    res.json({ status: blockchain.isValid().success, blocks: blockchain.blocks.length, lastBlock: blockchain.getLastBlock() });
});

/**
 * get blocks by hash or index
 */
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

app.post('/blocks', (req, res) => {
    console.log(req.body);
    if (req.body.hash === undefined || !req.body.data) {
        return res.status(400).json('missing data');
    }

    const block = new Block(req.body as Block);
    const isValid = blockchain.addBlock(block);

    if (isValid) {
        return res.status(201).json(block);
    } else {
        return res.status(400).json('invalid block');
    }
});
