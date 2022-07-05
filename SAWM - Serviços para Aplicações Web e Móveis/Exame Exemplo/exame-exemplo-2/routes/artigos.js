var express = require('express');
var router = express.Router();
var con = require('../connection')


// (a)  POST » add artigo
router.post('/', function (req, res, next) {

  const { autores, titulo, keywords, documento, nacionalidade_autor } = req.body
  const sql = 'INSERT INTO artigos (autores, titulo, keywords, documento, nacionalidade_autor) VALUES (?, ?, ?, ?, ?)'

  // 'INSERT INTO artigos (autores, titulo, keywords, documento, nacionalidade_autor) VALUES ('Dante', 'Meu title', 'artigos bons', 'meudoc.pdf', 'Portugal')'

  con.query(sql, [autores, titulo, keywords, documento, nacionalidade_autor], (err, results) => {
    if (err) throw err
    res.status(201).json({ status: true, message: 'Artigo inserido com sucesso!' })
  })
});

// (b)  POST » add novo autor a um artigo
router.put('/addAutor', function (req, res, next) {

  const { id, autor } = req.body
  const sqlGetAutores = 'SELECT autores from artigos WHERE id = ?'
  con.query(sqlGetAutores, [id, autor], (err, results) => {
    if (err) throw err

    let { autores } = results[0]
    autores += ', ' + autor

    const sqlAddAutor = 'UPDATE artigos SET autores = ? WHERE id = ?'
    con.query(sqlAddAutor, [autores, id], (err, results) => {
      if (err) throw err
      res.status(201).json({ status: true, message: 'Foi adicionado o autor ' + autor + '.' })
    })
  })

  // 'INSERT INTO artigos (autores, titulo, keywords, documento, nacionalidade_autor) VALUES ('Dante', 'Meu title', 'artigos bons', 'meudoc.pdf', 'Portugal')'
});

// (c)  POST » editar um artigo
router.put('/', function (req, res, next) {

  const { id, autores, titulo, keywords, documento, nacionalidade_autor } = req.body
  const sql = `UPDATE artigos 
  SET autores = ?, titulo = ?, keywords = ?, documento = ?, nacionalidade_autor = ?
  WHERE id = ?`

  con.query(sql, [autores, titulo, keywords, documento, nacionalidade_autor, id], (err, results) => {
    if (err) throw err
    res.status(201).json({ status: true, message: 'Artigo editado com sucesso.' })
  })
});

// (d)  POST » eliminar um artigo
router.delete('/:id', function (req, res, next) {

  const { id } = req.params
  const sql = `DELETE from artigos WHERE id = ?`

  con.query(sql, [id], (err, results) => {
    if (err) throw err
    res.status(200).json({ status: true, message: 'Artigo removido com sucesso.' })
  })
});

// (e) GET all articles
router.get('/', function (req, res, next) {

  const sql = `SELECT * from artigos`

  con.query(sql, (err, results) => {
    if (err) throw err
    res.status(200).json({ status: true, message: 'Artigo removido com sucesso.', data: results })
  })
});

// (e) GET um articles
router.get('/:id', function (req, res, next) {

  const { id } = req.params
  const sql = `SELECT * from artigos WHERE id = ?`

  con.query(sql, id, (err, results) => {
    if (err) throw err
    res.status(200).json({ status: true, message: 'Artigo removido com sucesso.', data: results })
  })
});

module.exports = router;
