var express = require('express');
var router = express.Router();
const conn = require('../connection')

// Criar artigo
router.post('/', function(req, res, next) {

  const { autor, titulo, keywords, documento, nacionalidade_autor } = req.body;
  const sql = `INSERT INTO artigos (autor, titulo, keywords, documento, nacionalidade_autor)
  VALUES (?, ?, ?, ?, ?)`;

  conn.query(sql, [autor, titulo, keywords, documento, nacionalidade_autor], (err) => {
    if (err) throw err;
    res.json({message: "SUCCESS :: Artigo criado"});
  });
});

// GET artigos
router.get('/', function(req, res, next) {
  
  const sql = `SELECT * FROM artigos`;

  conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
  
  // res.send('respond with a resource');
});

/*
"autor": "Dan Mar",
"titulo": "O Poder da Açãoo",
"keywords": "autoajuda, motivação",
"documento": "o-poder-acao.pdf",
"nacionalidade_autor": "Brasil"
*/
module.exports = router;
