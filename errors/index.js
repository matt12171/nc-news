exports.handlepsqlErrors = (err, req, res, next) => {
    if (err.code === "42703" || err.code === "42601" || err.code === "23502") {
      res.status(400).send({ msg: "bad request" });
    } else {
      next(err);
    }
  };
  
  exports.handleCustomErrors = (err, req, res, next) => {
    if (err.status && err.msg) {
      res.status(err.status).send({ msg: err.msg });
    } else {
      next(err);
    }
  };
  
  exports.handleServerErrors = (err, req, res, next) => {
    res.status(500).send({ msg: "Internal Server Error" });
  };
  