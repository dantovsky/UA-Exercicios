const mysql = require('mysql');
const config = {
    host: "localhost",
    port: "3306",
    user: "dantiii",
    password: "dantiii",
    database: "bookstore"
};
let con = mysql.createConnection(config);

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = con;
