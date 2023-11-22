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

describe('/api/topics/:article_id', ()=> {
    test('200: responds with 200 status code and correct article', ()=> {
        return request(app)
            .get('/api/articles/1')
            .expect(200)
            .then(({ body }) => {
                expect(body).toMatchObject({
                    article_id: 1,
                    title: expect.any(String),
                    topic: expect.any(String),
                    author: expect.any(String),
                    body: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    article_img_url: expect.any(String)
                })
            })
    })
    test('400: response with 400 status code and error msg when id format is incorrect', ()=> {
        return request(app)
            .get('/api/articles/cat')
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe('bad request')
            })
    })
    test('400: response with 400 status code and error msg when id does not exist', ()=> {
        return request(app)
            .get('/api/articles/999999')
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe('bad request')
            })
    })
})

describe('/api/articles', ()=> {
    test('200: responds with 200 status code and returns all articles with comment count', ()=> {
        return request(app)
            .get('/api/articles')
            .expect(200)
            .then(({ body })=> {
                expect(body.articles).toHaveLength(13)
                body.articles.forEach((article)=> {
                    expect(article).toEqual({
                        article_id: expect.any(Number),
                        title: expect.any(String),
                        topic: expect.any(String),
                        author: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                        article_img_url: expect.any(String),
                        comment_count: expect.any(Number)
                    })
                })
            })
    })
    test('200: check response is sorted by date in descending order', ()=> {
        return request(app)
            .get('/api/articles')
            .expect(200)
            .then(({ body })=> {
                expect(body.articles).toBeSorted({ descending: true, key: "created_at" })
            })
    })
})

describe('/api/topics/:article_id/comments', ()=> {
    test('200: responds with 200 status code and comments', ()=> {
        return request(app)
            .get('/api/articles/1/comments')
            .expect(200)
            .then(({ body }) => {
                expect(body.comments).toHaveLength(11)
                body.comments.forEach((comment)=> {
                    expect(comment).toEqual({
                        comment_id: expect.any(Number),
                        votes: expect.any(Number),
                        created_at: expect.any(String),
                        author: expect.any(String),
                        body: expect.any(String),
                        article_id: 1
                    })
                })
            })
    })
    test('200: responds with 200 status when given valid id with no comments', ()=> {
        return request(app)
            .get('/api/articles/2/comments')
            .expect(200)
            .then(({body}) => {
                expect(body.comments).toEqual([])
            })
    })
    test('400: response with 400 status code and error msg when valid id does not exist', ()=> {
        return request(app)
            .get('/api/articles/999999/comments')
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe('bad request')
            })
    })
    test('400: response with 400 status code and error msg when id is incorrect format', ()=> {
        return request(app)
            .get('/api/articles/dog/comments')
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe('bad request')
            })
    })
})