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
        `SELECT * FROM articles
        ORDER BY created_at DESC`
    ).then((response) => {
        const promise1 = response.rows.map((article)=> {
            return db.query(
                `SELECT * FROM comments
                WHERE article_id = $1`, [article.article_id]
            )
            .then((comments)=> {
                article.comment_count = comments.rows.length
                delete article.body
                return article
            })
        })
        return Promise.all(promise1)
            .then((articles) => {
                return articles
            })
        
    })
}

