const express = require('express')
const { getTopics } = require('./controllers/topic.controller')
const {
    handlepsqlErrors,
    handleCustomErrors,
    handleServerErrors,
  } = require("./errors");
const { getArticlesById } = require('./controllers/article.controller');

const app = express()



app.get('/api/topics', getTopics)
app.get('/api/articles/:article_id', getArticlesById)
// FINISH ARTICLE ID HERE 


app.use(handleServerErrors);


module.exports = app