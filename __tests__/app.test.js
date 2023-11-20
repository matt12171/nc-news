const request = require('supertest')
const app = require('../app')
const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const fs = require('fs/promises')


const testData = require('../db/data/test-data')
 


beforeEach(() => seed(testData))

afterAll(() => {
    return db.end()
})

describe('/api/topics', ()=> {
    test('200: responds with 200 status code and an array of topic objects', ()=> {
        return request(app)
            .get('/api/topics')
            .expect(200)
            .then(({body}) => {
                expect(body.topics).toHaveLength(3)
                body.topics.forEach((topic) => {
                    expect(topic).toMatchObject({
                        description: expect.any(String),
                        slug: expect.any(String)
                    })
                })
            })
    })
})

describe('/api', ()=> {
    test('200: responds with 200 status code and endpoints for api', ()=> {
        return fs.readFile('/Users/work/northcoders/backend/be-nc-news/endpoints.json', { encoding: 'utf-8' })
            .then((endpointsFile) => {
                return request(app)
                    .get('/api')
                    .expect(200)
                    .then(({ body }) => {
                        const endpointsFileParsed = JSON.parse(endpointsFile)
                        expect(body.endpoints).toEqual(endpointsFileParsed)
                    })
            })
    })
})