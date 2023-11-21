const express = require('express')
const { getTopics } = require('./controllers/topic.controller')
const {
    handlepsqlErrors,
    handleCustomErrors,
    handleServerErrors,
  } = require("./errors");
const { getApi } = require('./controllers/api.controller');
const { getArticlesById } = require('./controllers/article.controller');

const app = express()


app.get('/api', getApi)
app.get('/api/topics', getTopics)
app.get('/api/articles/:article_id', getArticlesById)



app.use(handlepsqlErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app