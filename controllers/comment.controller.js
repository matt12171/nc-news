const { deleteCommentByCommentId, updateVotesByCommentId } = require("../models/comment.model")

exports.deleteComment = (req, res, next) => {

    const id = req.params.comment_id
    deleteCommentByCommentId(id).then(()=> {
        res.status(204).send()
    })
    .catch((err)=> {
        next(err)
    })
}

exports.patchVotesByCommentId = (req, res, next) => {
    const id = req.params.comment_id
    const votes = req.body
    updateVotesByCommentId(votes, id).then((comment)=> {
        res.status(200).send({comment})
    })
    .catch((err)=> {
        next(err)
    })
}