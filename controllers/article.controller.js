const { selectArticleById, selectArticles, selectCommentsByArticle, updateVotesByArticleId } = require("../models/article.model")

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
    .catch((err) => {
        next(err)
    })
}

exports.getCommentsForArticle = (req, res, next) => {
    const id = req.params.article_id
    selectCommentsByArticle(id).then((comments) => {
        res.status(200).send({comments})
    })
    .catch((err)=> {
        next(err)
    })
}

exports.patchVotesByArticleId = (req, res, next) => {
    const id = req.params.article_id
    const votes = req.body.inc_votes
    updateVotesByArticleId(votes, id).then((article)=> {
        res.status(200).send({article})
    })
    .catch((err)=> {
        next(err)
    })
}