const request = require('supertest')
const babel_polyfill = require('babel-polyfill');
const app = require('../server/app')

describe('Post Endpoints', () => {
    it('should create a new post', async () => {
        const data = {
            userId: 1,
            title: 'test is cool',
        }
      const res = await request(app)
        .post('/add')
        .send(data)
      expect(res.statusCode).toEqual(201)
    })
  })