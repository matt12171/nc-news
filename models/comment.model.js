const db = require('../db/connection')

exports.deleteCommentByCommentId = (id) => {
    return db.query(`
    DELETE FROM comments
    WHERE comment_id = $1
    RETURNING *;`, [id])
    .then((response)=> {
        if (response.rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'not found' })
        }
    })
}

exports.updateVotesByCommentId = (votes, id) => {
    const votesKey = Object.keys(votes)
    if (typeof votes.inc_votes !== 'number' || votesKey.indexOf('inc_votes') === -1) {
        return Promise.reject({ status: 400, msg: 'bad request' })
    }
    return db.query(`
    UPDATE comments
    SET votes = votes + $1
    WHERE comment_id = $2
    RETURNING *;`, [votes.inc_votes, id])
    .then((response)=> {
        if (response.rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'not found' })
        }
        return response.rows[0]
    })

}