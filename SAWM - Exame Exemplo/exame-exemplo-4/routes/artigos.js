var express = require('express');
var router = express.Router();
var con = require('../connections');

// a » POST add artigo
router.post('/', function (req, res, next) {

  const { autores, titulo, keywords, documento, nacionalidade } = req.body
  const sql = `INSERT INTO artigos (autores, titulo, keywords, documento, nacionalidade) VALUES (?, ?, ?, ?, ?)`

  con.query(sql, [autores, titulo, keywords, documento, nacionalidade], (err, results) => {
    if (err) throw err;
    res.status(200).json({ status: true, message: 'Artigo inserido', results });
  })
});

// b » POST add autor ao artigo
router.post('/addautor/:id', function (req, res, next) {

  const { id } = req.params
  const sqlGet = 'SELECT autores from artigos where id = ?'

  con.query(sqlGet, [id], (err, results) => {
    if (err) throw err;

    const autores = results[0].autores + ', ' + req.body.autores
    const sql = `UPDATE artigos SET autores = ? WHERE id = ?`

    con.query(sql, [autores, id], (err, results) => {
      if (err) throw err;
      res.status(201).json({ status: true, message: 'Novo autor inserido', results });
    })
  })
});

// c » PUT editar artigo
router.put('/:id', function (req, res, next) {

  const { id } = req.params
  const { autores, titulo, keywords, documento, nacionalidade } = req.body
  const sql = `UPDATE artigos SET autores = ?, titulo = ?, keywords = ?, documento = ?, nacionalidade = ? WHERE id = ?`

  con.query(sql, [autores, titulo, keywords, documento, nacionalidade, id], (err, results) => {
    if (err) throw err;
    res.status(200).json({ status: true, message: 'Artigo alterado', results });
  })
});

// d » DELETE deletar um artigo
router.delete('/:id', exsitsId, function (req, res, next) {

  const { id } = req.params
  const sql = `DELETE from artigos WHERE id = ?`

  con.query(sql, [id], (err, results) => {
    if (err) throw err;
    res.status(200).json({ status: true, message: 'Artigo deletado', results });
  })
});

// e » GET todos os artigos
router.get('/', function (req, res, next) {

  const sql = `SELECT * FROM artigos`

  con.query(sql, (err, results) => {
    if (err) throw err;
    res.status(200).json({ status: true, message: 'Artigo obtidos com sucesso', data: results });
  })
});

// e » GET um artigo
router.get('/:id', function (req, res, next) {

  const { id } = req.params
  const sql = `SELECT * FROM artigos WHERE id = ?`

  con.query(sql, [id], (err, results) => {
    if (err) throw err;
    res.status(200).json({ status: true, message: 'Artigo obtido com sucesso', data: results });
  })
});

// MIDDLEWARE

function exsitsId(req, res, next) {

  const { id } = req.params
  const sql = `SELECT * FROM artigos WHERE id = ?`

  con.query(sql, [id], (err, results) => {
    if (err) throw err;
    if (results.length == 0) {
      return res.status(400).json({ status: false, message: 'ID não existe!', results });
    } else {
      return next()
    }
  })
}

module.exports = router;
