const { selectArticleById } = require("../models/article.model")

exports.getArticlesById = (req, res, next) => {
    const id = req.params.article_id

    selectArticleById(id).then((article) => {
        res.status(200).send(article)
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })
}