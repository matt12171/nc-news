const express = require('express')
const { getTopics } = require('./controllers/topic.controller')
const {
    handlepsqlErrors,
    handleCustomErrors,
    handleServerErrors,
  } = require("./errors");
const { getApi } = require('./controllers/api.controller');

const app = express()


app.get('/api', getApi)
app.get('/api/topics', getTopics)


app.use(handleServerErrors);


module.exports = app