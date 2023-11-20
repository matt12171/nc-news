const request = require('supertest')
const app = require('../app')
const db = require('../db/connection')
const seed = require('../db/seeds/seed')

const testData = require('../db/data/test-data')

beforeEach(() => seed(testData))

afterAll(() => {
    return db.end()
})

describe('/api/topics', ()=> {
    test('200: responds with 200 status code', ()=> {
        
    })
})