exports.handlepsqlErrors = (err, req, res, next) => {
  if (err.code === '22P02') {
    res.status(400).send({ msg: "bad request" });
  } else {
    console.log(err)
    next(err);
  }
};

exports.handleServerErrors = (err, req, res, next) => {
    res.status(500).send({ msg: "Internal Server Error" });
  };
  