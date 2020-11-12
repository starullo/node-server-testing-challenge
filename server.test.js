const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
    it('testing the correct environment', () => {
        expect(process.env.DB_ENV).toBe('testing')
    })
    it('get / endpoint is working', async () => {
        
        return request(server).get('/')
        .expect({message: 'wow'})
        
    })
})