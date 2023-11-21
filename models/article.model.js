const db = require('../db/connection')

exports.selectArticleById = (id) => {
    let queryStr = `SELECT * FROM articles `

    if (id) {
        queryStr += `WHERE article_id = $1 `
    }

    return db.query(queryStr, [id])
        .then((response) => {
            if (response.rows.length === 0) {
                return Promise.reject({ status: 400, msg: 'bad request' })
            } else {
                return response.rows[0]
            }
        })
}