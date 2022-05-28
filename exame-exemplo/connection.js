var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "dantiii",
  password: "xpto",
  database: "exame_exemplo"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = con