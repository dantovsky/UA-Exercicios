var express = require('express');
var router = express.Router();
let con = require('../connection')

/* Livrarias's home » Endpoint: http://localhost:3000/livraria */
router.get('/', function(req, res, next) {
  res.send('Bem vindos à app Livraria!!');
});

/* GET books listing */
router.get('/livros', function(req, res, next) {
  res.send('Bom vindos à app Livraria!');
});

module.exports = router;
