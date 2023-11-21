const db = require('../db/connection')

exports.selectArticleById = (id) => {
    return db.query(
        `SELECT * FROM articles
        WHERE article_id = $1;`, [id])
        .then((response) => {
            if (response.rows.length === 0) {
                return Promise.reject({ status: 400, msg: 'bad request' })
            } else {
                return response.rows[0]
            }
        })
}

exports.selectArticles = () => {
    return db.query(
        `SELECT * FROM articles;`
    ).then((response) => {
        return response.rows
    })
}