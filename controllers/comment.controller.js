const { deleteCommentByCommentId } = require("../models/comment.model")

exports.deleteComment = (req, res, next) => {

    const id = req.params.comment_id
    deleteCommentByCommentId(id).then(()=> {
        res.status(204).send()
    })
    .catch((err)=> {
        next(err)
    })
}