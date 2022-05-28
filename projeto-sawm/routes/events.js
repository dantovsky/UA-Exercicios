var express = require('express');
var createError = require('http-errors');
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

// List an event by ID
router.get('/:id', function (req, res, next) {

    const { id } = req.params;
    const sql = "SELECT * FROM events WHERE id = ?";

    conn.query(sql, id, (err, results) => {
        if (err) throw res.send(err)
        res.json(results);
    })
});

// Add a new event
router.post('/', verifyIfEventExists, function (req, res, next) {

    const { name, description, country, city, date } = req.body
    const sql = `INSERT INTO events (name, description, country, city, date) VALUES (?, ?, ?, ?, ?)`;

    conn.query(sql, [name, description, country, city, date], (err) => {
        if (err) throw res.send(err)
    })

    return res.status(201).json({ message: "Evento adicionado com sucesso." })
});

// Update an event
router.put('/', verifyIfEventExists, function (req, res, next) {

    const { id, name, description, country, city, date } = req.body
    const sql = `
    UPDATE events
    SET name = ?, description = ?, country = ?, city = ?, date = ?
    WHERE id = ?`

    console.log('insideput')
    conn.query(sql, [name, description, country, city, date, id], (err) => {
        if (err) throw res.send(err)
    })

    return res.status(201).json({ message: "Evento atualizado com sucesso." })
});

// ------------------------------------------
// Middlewares
// ------------------------------------------

// Middleware to use in POST and PUT operations
function verifyIfEventExists(req, res, next) {

    const { id, country, city, name, date } = req.body

    const sql = `
    SELECT * FROM events
    WHERE country = ? AND city = ? AND name = ? AND date = ?` + (id == undefined ? '' : ' AND id != ?');
    const paramsToQuery = id == undefined ? [country, city, name, date] : [country, city, name, date, id]

    conn.query(sql, paramsToQuery, (err, results) => {
        if (err) throw res.send(err)
        if (results.length > 0) {
            // next(createError(401))
            return res.status(400).json({ message: "An event with the same name, country, city and date already exists." });
        } else {
            return next()
        }
    })
}

/*
{
	"id": 57,
	"name": "Super Evento",
	"description": "Um evento de Forró no Porto.",
	"country": "Portugal",
	"city": "Aveiro",
	"date": "2022-08-15"
}
*/

module.exports = router;
