var con = require('../connection')

const createArticle = (req, res, next) => {

    const { autores, titulo, keywords, documento, nacionalidade, data } = req.body
    const sql = 'INSERT INTO artigos (autores, titulo, keywords, documento, nacionalidade, data) VALUES (?, ?, ?, ?, ?, ?)'

    con.query(sql, [autores, titulo, keywords, documento, nacionalidade, data], (err, results) => {
        if (err) throw err;
        res.json(results);
    })
}

const addAuthor = (req, res, next) => {

    const { id } = req.params
    const { novoAutor } = req.body
    const sqlGet = 'SELECT autores from artigos where id = ?'

    con.query(sqlGet, [id], (err, results) => {
        if (err) throw err;

        let autores = results[0].autores
        autores += ', ' + novoAutor
        const sql = 'UPDATE artigos SET autores = ? where id = ?'

        con.query(sql, [autores, id], (err, uresults) => {
            if (err) throw err;
            res.json(results);
        })
    })
}

const updateArticle = (req, res, next) => {

    const { id } = req.params
    const { autores, titulo, keywords, documento, nacionalidade, data } = req.body
    const sql = 'UPDATE artigos SET autores = ?, titulo = ?, keywords = ?, documento = ?, nacionalidade = ?, data = ? where id = ?'

    con.query(sql, [autores, titulo, keywords, documento, nacionalidade, data, id], (err, results) => {
        if (err) throw err;
        res.json({mesasge: 'Atualizado com sucesso', ...results});
    })
}

const deleteArticle = (req, res, next) => {

    const { id } = req.params
    const sql = 'DELETE from artigos WHERE id = ?'

    con.query(sql, [id], (err, results) => {
        if (err) throw err;
        res.json({mesasge: 'Deletado com sucesso', ...results});
    })
}

const getAllArticles = (req, res, next) => {
    const sql = 'SELECT * from artigos'
    con.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
}

const getArticleById = (req, res, next) => {

    const { id } = req.params
    const sql = 'SELECT * from artigos where id = ?'
    
    con.query(sql, [id], (err, results) => {
        if (err) throw err;
        res.send(results);
    })
}

module.exports = { getAllArticles, addAuthor, createArticle, updateArticle, deleteArticle, getArticleById }