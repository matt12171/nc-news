const db = require("./db/connection");
const format = require("pg-format");

exports.checkExists = (table, column, value) => {
  const queryString = format(`SELECT * FROM %I WHERE %I = $1;`, table, column);
  return db.query(queryString, [value]).then(({ rows }) => {
    console.log(rows)
    if (!rows.length) {
      return Promise.reject({ status: 400, msg: "bad request" });
    }
  });
};