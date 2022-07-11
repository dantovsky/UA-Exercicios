var mysql = require('mysql');

// Q2.a
var con = mysql.createConnection({
  host: "estga-dev.clients.ua.pt",
  user: "SAWMDBUser",
  password: "sawmgarantias",
  database: "BasedadosSAWM",
  port: 3306
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = con