var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "dantiii",
  password: "xpto",
  database: "exame_exemplo_3"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = con