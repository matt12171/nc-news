const db = require('../db/connection')
const {
    convertTimestampToDate,
    createRef,
    formatComments,
  } = require('../db/seeds/utils');
const format = require('pg-format');
const { checkExists } = require('../utils')

exports.selectArticleById = (id) => {
    return db.query(
        `SELECT * FROM articles
        WHERE article_id = $1;`, [id])
        .then((response) => {
            if (response.rows.length === 0) {
                return Promise.reject({ status: 404, msg: 'not found' })
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

exports.insertComment = (id, newComment) => {
    if (!newComment.hasOwnProperty('username') || !newComment.hasOwnProperty('body')) {
        return Promise.reject({ status: 400, msg: 'bad request' })
    }

    const formedComment = [{
        body: newComment.body,
        votes: 0,
        author: newComment.username,
        article_id: Number(id),
        created_at: Date.now(),
    }]
    return db.query(`SELECT * FROM articles;`)
        .then((response)=> {
            const articleIdLookup = createRef(response.rows, 'title', 'article_id');
            
            const formattedCommentData = formatComments(formedComment, articleIdLookup);
            return db.query(format(
                `INSERT INTO comments (body, author, article_id, votes, created_at) VALUES %L
                RETURNING *`,
                formattedCommentData.map(
                  ({ body, author, article_id, votes = 0, created_at }) => [
                    body,
                    author,
                    article_id,
                    votes,
                    created_at,
                  ]
                )
              ))
              .then((response) => {
                    return response.rows[0]
              })
   });
        
exports.selectCommentsByArticle = (id) => {
    return db.query(`
    SELECT * FROM comments
    WHERE article_id = $1
    ORDER BY comments.created_at DESC`, [id])
    .then((response) => {
        return checkExists("articles", "article_id", id)
        .then(()=> {
            return response.rows
        })
    })
}