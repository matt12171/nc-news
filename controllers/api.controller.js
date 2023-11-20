const { selectApi } = require("../models/api.model")


exports.getApi = (req, res, next) => {
    selectApi()
        .then((endpoints)=> {
            const endpointsParsed = JSON.parse(endpoints)
            res.status(200).send({ endpointsParsed })
        })
        .catch((err) => {
            console.log(err)
            next(err)
        })
}