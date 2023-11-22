const { selectArticleById, selectArticles } = require("../models/article.model")

exports.getArticlesById = (req, res, next) => {
    const id = req.params.article_id

    selectArticleById(id).then((article) => {
        res.status(200).send(article)
    })
    .catch((err) => {
        next(err)
    })
}

exports.getArticles = (req, res, next) => {
    selectArticles().then((articles) => {
        res.status(200).send({articles})
    })
}