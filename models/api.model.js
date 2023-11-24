const db = require('../db/connection')
const fs = require('fs/promises')


exports.selectTopics = () => {
    let queryStr = `SELECT * FROM topics`
    return db.query(queryStr)
        .then(({ rows }) => {
            return rows
        })
}

exports.selectApi = () => {
    return fs.readFile('./endpoints.json', { encoding: "utf-8" })
        .then((endpoint) => {
            return JSON.parse(endpoint)
        })
}