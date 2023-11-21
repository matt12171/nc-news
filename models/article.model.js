const db = require('../db/connection')

exports.selectArticleById = (id) => {
    let queryStr = `SELECT * FROM articles `

    if (id) {
        queryStr += `WHERE article_id = $1`
    }

    return db.query(queryStr, [id])
        .then((response) => {
            return response.rows[0]
        })
}