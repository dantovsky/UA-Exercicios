var express = require('express');
var router = express.Router();
const conn = require('../connection')

// List events
router.get('/', function (req, res, next) {

  const sql = "SELECT * FROM events";
  
  conn.query(sql, (err, results) => {
    if (err) throw res.send(err)
    res.json(results);
  })
});

module.exports = router;
