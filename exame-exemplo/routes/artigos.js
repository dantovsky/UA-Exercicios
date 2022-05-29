var express = require('express');
const res = require('express/lib/response');
var router = express.Router();
const conn = require('../connection')

// » Respostas do exame exeplo de SAWM.

// (a) Criar artigo
router.post('/', function (req, res, next) {

    const { autor, titulo, keywords, documento, nacionalidade_autor } = req.body;
    const sql = `INSERT INTO artigos (autor, titulo, keywords, documento, nacionalidade_autor)
  VALUES (?, ?, ?, ?, ?)`;

    conn.query(sql, [autor, titulo, keywords, documento, nacionalidade_autor], (err) => {
        if (err) throw err;
        res.json({ message: "SUCCESS :: Artigo criado" });
    });
});

// (b) Adicionar novo autor a um artigo
router.post('/addAuthor', hasArticle, function (req, res, next) {

    const { autor, id } = req.body;

    const sqlGet = "select autor from artigos where id = ?"
    conn.query(sqlGet, id, (err, results) => {
        if (err) throw err;

        const newAutorList = results[0].autor + ';' + autor
        const sql = "update artigos set autor = ? where id = ?";
        conn.query(sql, [newAutorList, id], (err) => {
            if (err) throw err;
            res.json({ message: "SUCCESS :: Autor adicionado com sucesso!" });
        });

    });
});

// (c) Editar um artigo
router.put('/', hasArticle, function (req, res, next) {

    const { id, autor, titulo, keywords, documento, nacionalidade_autor } = req.body;
    const sql = `update artigos set autor = ?, titulo = ?, keywords = ?, documento = ?, nacionalidade_autor = ? where id = ?`;

    conn.query(sql, [autor, titulo, keywords, documento, nacionalidade_autor, id], (err) => {
        if (err) throw err;
        res.json({ message: "SUCCESS :: Artigo alterado" });
    });
});

// (d) Deletar um artigo
router.delete('/:id', hasArticle, (req, res) => {

    const { id } = req.params;
    const sql = 'DELETE from artigos WHERE id = ?';

    conn.query(sql, id, (err, results) => {
        if (err) throw err;
        res.json({ message: "SUCCESS :: Artigo deletado" });
    });
});

// (e) Listar todos os artigos
router.get('/', function (req, res, next) {

    const sql = `SELECT * FROM artigos`;

    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// (f) Listar os detalhes de um artigo
router.get('/:id', function (req, res, next) {

    const sql = `SELECT * FROM artigos where id = ?`;

    conn.query(sql, [req.params.id], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// ---------------------------------------------------
// MIDDLEWARES
// ---------------------------------------------------

// Verifica se existe um artigo com o ID especificado no body ou no parâmetro (delete case)
function hasArticle(req, res, next) {

    let { id } = req.body
    if (id == undefined) {
        id = req.params.id
    }
    const sql = "select * from artigos where id = ?"

    conn.query(sql, Number(id), (err, results) => {
        if (err) throw err;
        if (results.length == 0) {
            return res.status(400).json({ message: "Não existe um artigo com o ID " + id })
        } else {
            return next()
        }
    })
}

module.exports = router;
