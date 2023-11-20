const express = require('express')
const { getTopics } = require('./controllers/topic.controller')
const {
    handlepsqlErrors,
    handleCustomErrors,
    handleServerErrors,
  } = require("./errors");

const app = express()

app.use(express.json())

app.get('/api/topics', getTopics)

app.use(handlepsqlErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);


module.exports = app