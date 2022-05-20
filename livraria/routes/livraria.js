var express = require('express');
const { is } = require('express/lib/request');
const { route } = require('.');
var router = express.Router();
let con = require('../connection')


// GET :: Livrarias's home » Endpoint: http://localhost:3000/livraria
router.get('/livros', (req, res) => {

    // Accessing MySQL DB
    const sql = "SELECT * from books";
    con.query(sql, (err, results) => {
        if (err) throw res.send(err)
        res.json(results);
    })
    // res.send('Bem vindos à app Livraria!!');
});


// GET :: books listing
router.get('/livros/:id', (req, res) => {

    // Accessing MySQL DB
    const sql = "SELECT * from books where id = ?";
    con.query(sql, req.params.id, (err, results) => {
        if (err) throw res.send(err)
        res.json(results);
    })
});

// POST :: add a book
router.post('/livros', async (req, res, next) => {

    const { isbn, title, description, author } = req.body

    console.log('ISBN:', req.body)
    // res.send(req.body)

    // Validate if already exist ISBN
    const sqlGetById = "SELECT * from books where isbn = ?";
    con.query(sqlGetById, isbn, (err, results) => {
        if (err) throw err

        if (results.length > 0) {
            res.status(401).json({ status: 'error', message: `Já existe um livro registado com o mesmo ISBN (${isbn}).` });
        } else {
            // Accessing MySQL DB
            const sql = "INSERT INTO books (isbn, title, description, author) VALUES (?, ?, ?, ?)";
            con.query(sql, [isbn, title, description, author], (err, results) => {
                if (err) throw res.send(err)
                res.status(200).send({ ...results, message: results.affectedRows == 0 ? "Nenhum registo foi adicionado" : "Novo livro adicionado com sucesso" })

            })
        }
    })
    
    // INSERT INTO books (isbn, title, description, author) VALUES (01112223339, 'Livro Teste', 'Um livro de teste.', 'Dante Marinho')
});


// PUT :: update a book
router.put('/livros', (req, res) => {

    const { id, isbn, title, description, author } = req.body

    // Validate if already exist ISBN
    const sqlGetById = "SELECT * from books where isbn = ?";
    con.query(sqlGetById, isbn, (err, results) => {
        if (err) throw err

        if (results.length > 0) {
            res.status(401).json({ status: 'error', message: `Já existe um livro registado com o mesmo ISBN (${isbn}).` });
        } else {
            // Accessing MySQL DB
            const sql = "UPDATE books SET isbn = ?, title = ?, description = ?, author = ? WHERE id = ?";
            con.query(sql, [isbn, title, description, author, id], (err, results) => {
                if (err) throw res.send(err)
                res.send(results)
            })
        }
    })
});

// DELETE :: delete a book
router.delete('/livros/:id', (req, res) => {

    // const {id} = req.body

    // Accessing MySQL DB
    const sql = "DELETE from books WHERE id = ?";
    con.query(sql, [req.params.id], (err, results) => {
        if (err) throw res.send(err)
        res.json({ ...results, message: results.affectedRows == 0 ? "O ID indicado não existe" : "Livro removido com sucesso" })
    })
});

// Restore to initial values
router.get('/livros/utils/restore', (req, res) => {

    // DELETE ALL
    con.query("DELETE FROM books", (err, results) => {
        if (err) throw res.send(err)
    })

    // INSERT INITIAL VALUES
    con.query(
        `INSERT INTO books (id, isbn, title, description, author) VALUES
        (1, 01112223334, 'Seja Bom', 'Um livro que fala como você pode ser uma pessoa melhor.', 'Dante Marinho'),
        (2, 01112223335, 'Fábicra de Vencedores', 'Destinado às pessoas com forte vertente empreendedora, ou que almejam essa conquista.', 'Janguiê Diniz'),
        (3, 01112223336, 'The Duck Donad', 'A história de como surgiu um dos personagens mais caricatos que alguma vez já existiu.', 'Paul Erold'),
        (4, 01112223337, 'The Beatles History', 'A história completa da vida e do surgimento do grupo que foi amado por todo o mundo.', NULL),
        (5, 01112223338, 'Foco', 'Aprenda a como realizar taregas e finalizá-las.', NULL)`,
        (err, results) => {
            if (err) throw res.send(err)
            res.send(results)
        }
    )
})

// Auxiliar funcitons

// async function existISBN(isbn, res, next) {
//     const sqlGetById = "SELECT * from books where isbn = ?";
//     await con.query(sqlGetById, isbn, (err, results) => {
//         if (err) throw err
//         console.log(results && results.length > 0)
//         console.log(results.length)
//         next()
//     })
// }

module.exports = router;
