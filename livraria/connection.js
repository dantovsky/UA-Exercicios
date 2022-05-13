const mysql = require('mysql');
const config = {
    host: "127.0.0.1",
    user: "dantiii",
    password: "dantiii",
    // database: "books"
};
let con = mysql.createConnection(config);

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = con;
