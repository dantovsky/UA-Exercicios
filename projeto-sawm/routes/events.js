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
router.post('/', verifyDates, verifyInitialDate, verifyIfEventExists, function (req, res, next) {

    const { name, description, country, city, date, endDate } = req.body
    const sql = `INSERT INTO events (name, description, country, city, date, end_date) VALUES (?, ?, ?, ?, ?, ?)`;

    conn.query(sql, [name, description, country, city, date, endDate], (err) => {
        if (err) throw res.send(err)
        return res.status(201).json({ message: "Evento adicionado com sucesso." })
    })
});

// Update an event
router.put('/', verifyDates, verifyInitialDate, verifyIfEventExists, function (req, res, next) {

    const { id, name, description, country, city, date } = req.body
    const sql = `
    UPDATE events
    SET name = ?, description = ?, country = ?, city = ?, date = ?
    WHERE id = ?`

    conn.query(sql, [name, description, country, city, date, id], (err) => {
        if (err) throw res.send(err)
        return res.status(201).json({ message: "Evento atualizado com sucesso." })
    })
});

// Delete an event
router.delete('/:id', function (req, res, next) {

    const { id } = req.params
    const sql = `DELETE from events WHERE id = ?`
    console.log(id)

    conn.query(sql, [id], (err) => {
        if (err) throw res.send(err)
        return res.status(200).json({ message: "Evento removido com sucesso." })
    })
});

// ----------------------------------------------------------------
// » Middlewares
// ----------------------------------------------------------------

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

// Middleware to verify if end_date is after initial date event, if not null
function verifyDates(req, res, next) {

    let { date, endDate } = req.body

    if (endDate == null || endDate == undefined) {
        return next()
    }

    const startDate = new Date(date)
    endDate = new Date(endDate)

    if (endDate < startDate) {
        return res.status(400).json({ message: "A data de término não pode ser antes da data inicial do evento." });
    } else {
        return next()
    }
}

// Middleware to verify if initial date is longer than 2 years
function verifyInitialDate(req, res, next) {

    const { date } = req.body

    const today = new Date()
    const startDate = new Date(date)

    console.log(today)
    console.log((startDate - today) / 1000 / 60 / 60 / 25)

    if ((startDate - today) / 1000 / 60 / 60 / 24 > 731) {
        return res.status(400).json({ message: "A data de início do evento não pode ser maior que dois anos." });
    } else {
        return next()
    }
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
