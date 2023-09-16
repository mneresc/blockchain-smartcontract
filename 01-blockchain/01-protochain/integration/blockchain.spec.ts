import request from 'supertest';
import { app } from '../src/server/blockchain-server';

describe('BlockChain Server Tests', () => {
    test('GET /status', async () => {
        const response = await request(app).get('/status');
        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
        expect(response.body.blocks).toBe(1);
    });

    test('GET /blocks/next', async () => {
        const response = await request(app).get('/blocks/next');
        expect(response.status).toBe(200);
        expect(response.body.index).toBe(1);
    });

    test('GET /blocks/0', async () => {
        const response = await request(app).get('/blocks/0');
        expect(response.status).toBe(200);
        expect(response.body.index).toBe(0);
    });

    test('GET /blocks/1', async () => {
        const response = await request(app).get('/blocks/11110');
        expect(response.status).toBe(404);
    });

    test('GET /blocks/:hash', async () => {
    const responseBlock = await request(app).get('/blocks/0');

        const response = await request(app).get(`/blocks/${responseBlock.body.hash}`);
        expect(response.status).toBe(200);
    });


    test('GET /blocks/invalid', async () => {
        const response = await request(app).get('/blocks/invalid');
        expect(response.status).toBe(404);
    });

    test('POST /blocks', async () => {
        const responseBlock = await request(app).get('/blocks/0');
        const responseStatus = await request(app).get('/status');
        const response = await request(app).post('/blocks').send({ data: 'test' ,hash:'', 'previousHash': responseBlock.body.hash, index: responseStatus.body.blocks, nonce: 1, minedBy:'me'});
        expect(response.status).toBe(201);
        expect(response.body.index).toBe(1);
    });


    test('POST /blocks', async () => {
        const responseStatus = await request(app).get('/status');
        const response = await request(app).post('/blocks').send({ data: 'test' ,hash:'', 'previousHash': 'wrong hash', index: responseStatus.body.blocks});
        expect(response.status).toBe(400);
    });

    test('POST /blocks invalid', async () => {
        const response = await request(app).post('/blocks').send({ data: '' });
        expect(response.status).toBe(400);
    });

    test('POST /transactions', async () => {
        const response = await request(app).post('/transactions').send({ data: 'test' ,hash:''});
        expect(response.status).toBe(201);
    });

    test('POST /transactions undefiend hash', async () => {
        const response = await request(app).post('/transactions').send({ data: 'test'});
        expect(response.status).toBe(400);
    });

    test('POST /transactions invalid', async () => {
        const response = await request(app).post('/transactions').send({ data: 'a' , hash:'x' });
        expect(response.status).toBe(400);
    });
});
