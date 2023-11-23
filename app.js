const express = require('express')
const { getTopics } = require('./controllers/topic.controller')
const {
    handlepsqlErrors,
    handleCustomErrors,
    handleServerErrors,
  } = require("./errors");
const { getApi } = require('./controllers/api.controller');
const { deleteComment } = require('./controllers/comment.controller');
const { getArticlesById, getArticles, postComment, getCommentsForArticle, patchVotesByArticleId} = require('./controllers/article.controller');
const { getUsers } = require('./controllers/user.controller');
const app = express()
app.use(express.json())

app.get('/api', getApi)
app.get('/api/topics', getTopics)
app.get('/api/articles/:article_id', getArticlesById)
app.get('/api/articles', getArticles)
app.get('/api/articles/:article_id/comments', getCommentsForArticle)
app.get('/api/users', getUsers)

app.patch('/api/articles/:article_id', patchVotesByArticleId)

app.post('/api/articles/:article_id/comments', postComment)

app.delete('/api/comments/:comment_id', deleteComment)



app.use(handlepsqlErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app