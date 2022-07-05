var express = require('express');
var router = express.Router();
var conctrollers = require("../controllers/artigosController");
var con = require('../connection')

// POST » Criar um artigo
router.post('/', conctrollers.createArticle);

// POST » Criar um artigo
router.post('/addAuthor/:id', conctrollers.addAuthor);

// PUT » Editar um artigo
router.put('/:id', conctrollers.updateArticle);

// DELETE » Editar um artigo
router.delete('/:id', existsId, conctrollers.deleteArticle);

// GET » Listar todos os artigos
router.get('/', conctrollers.getAllArticles);

// GET » Listar um artigo
router.get('/:id', existsId, conctrollers.getArticleById);


// MIDDLEWARES


function existsId(req, res, next) {

  const { id } = req.params
  const sql = 'SELECT * from artigos where id = ?'

  con.query(sql, [id], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res.status(400).json({ status: false, message: 'ID não existente!', ...results })
    } else {
      return next()
    }
  })
}

module.exports = router;
