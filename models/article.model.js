const { response } = require('../app')
const db = require('../db/connection')
const { checkExists } = require('../utils')

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
    return db.query(`
        SELECT 
            articles.*, 
            COUNT(comments.article_id) AS comment_count
        FROM 
            articles
        LEFT JOIN 
            comments ON articles.article_id = comments.article_id
        GROUP BY 
            articles.article_id
        ORDER BY 
            articles.created_at DESC;
    `).then((response) => {
        response.rows.forEach((article) => {
            delete article.body
            article.comment_count = Number(article.comment_count)
        })
        return response.rows;
    });
};


exports.selectCommentsByArticle = (id) => {
    return db.query(`
    SELECT * FROM comments
    WHERE article_id = $1
    ORDER BY comments.created_at DESC;`, [id])
    .then((response) => {
        return checkExists("articles", "article_id", id)
        .then(()=> {
            return response.rows
        })
    })
}

exports.updateVotesByArticleId = (votes, id) => {
    const votesKey = Object.keys(votes)
    if (typeof votes.inc_votes !== 'number' || votesKey.indexOf('inc_votes') === -1) {
        return Promise.reject({ status: 400, msg: 'bad request' })
    }
    return db.query(`
    UPDATE articles
    SET votes = votes + $1
    WHERE article_id = $2
    RETURNING *;`, [votes.inc_votes, id])
    .then((response)=> {
        if (response.rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'not found' })
        }
        return response.rows[0]
    })
}