var express = require('express');
// var createError = require('http-errors');
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
        return res.status(201).json({ status: 'OK', message: "Evento adicionado com sucesso." })
    })
});

// Update an event
router.put('/', verifyIfIdExists, verifyDates, verifyInitialDate, verifyIfEventExists, function (req, res, next) {

    const { id, name, description, country, city, date, endDate } = req.body

    const sql = `
    UPDATE events
    SET name = ?, description = ?, country = ?, city = ?, date = ?, end_date = ?
    WHERE id = ?`

    conn.query(sql, [name, description, country, city, date, endDate, id], (err) => {
        if (err) throw res.send(err)
        return res.status(201).json({ status: 'OK', message: "Evento atualizado com sucesso." })
    })
});

// Delete an event
router.delete('/:id', verifyIfIdExists, function (req, res, next) {

    const { id } = req.params
    const sql = `DELETE from events WHERE id = ?`

    conn.query(sql, [id], (err) => {
        if (err) throw res.send(err)
        return res.status(200).json({ status: 'OK', message: "Evento removido com sucesso." })
    })
});

// Restore BD to initial values
router.get('/utils/restore', (req, res) => {

    // DELETE ALL
    conn.query("DELETE FROM events", (err, results) => {
        if (err) throw res.send(err)
    })

    // INSERT INITIAL VALUES
    conn.query(
        `INSERT INTO events (id, name, description, country, city, date, end_date) VALUES
        (1, "Festival de Forró de Lisboa", 'O melhor festival de Forró da cidade de Lisboa.', 'Portugal', 'Lisboa', '2022-06-27', null),
        (2, "Festival Dança Aveiro", 'O melhor festival de dança de Portugal.', 'Portugal', 'Aveiro', '2022-08-11', '2022-08-15'),
        (3, "Encontro de Corais", 'Um grande encontro de corais no Porto.', 'Portugal', 'Porto', '2022-08-15', null),
        (4, "Tap Beauty", 'Festival de Sapateado de UK.', 'UK', 'London', '2022-09-10', '2022-09-11'),
        (5, "Forró Petit Gateaux", 'O melhor festival de Forró em Paris.', 'France', 'Paris', '2022-11-20', null),
        (6, "Encontro de Músicos de Aveiro", 'Um encontro de amigos.', 'Portugal', 'Aveiro', '2022-08-28', null),
        (7, "Festival Dança Faro", 'O melhor festival de dança de Portugal.', 'Portugal', 'Faro', '2022-08-12', '2022-08-16'),
        (8, "Encontro de Flautistas", 'Um grande encontro de flautas no Porto.', 'Portugal', 'Porto', '2022-08-15', null),
        (9, "Tap Rithmn", 'Festival de Sapateado de Lisboa.', 'Portugal', 'Lisboa', '2022-09-20', '2022-09-23'),
        (10, "Tech Day", 'O melhor festival de Forró em Paris.', 'Espanha', 'Barcelona', '2022-11-20', null)`,
        (err, results) => {
            if (err) throw res.send(err)
            res.send(results)
        }
    )
})

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
            return res.status(400).json({ status: 'FAIL', message: "An event with the same name, country, city and date already exists." });
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

    const startDate = new Date(date.substr(0, 10))
    endDate = new Date(endDate.substr(0, 10))

    if (endDate < startDate) {
        return res.status(400).json({ status: 'FAIL', message: "A data de término não pode ser antes da data inicial do evento." });
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
    console.log((startDate - today) / 1000 / 60 / 60 / 24)

    if ((startDate - today) / 1000 / 60 / 60 / 24 > 731) {
        return res.status(400).json({ message: "A data de início do evento não pode ser maior que dois anos." });
    } else {
        return next()
    }
}

// Middleware to use in PUT and DELETE operations
function verifyIfIdExists(req, res, next) {

    let { id } = req.body

    if (id == undefined) {
        id = req.params.id
    }

    const sql = `SELECT * FROM events WHERE id = ?`;

    conn.query(sql, id, (err, results) => {
        if (err) throw res.send(err)
        if (results.length == 0) {
            return res.status(404).json({ status: 'FAIL', message: "Não existe evento com o ID " + id + '.'});
        } else {
            return next()
        }
    })
}

module.exports = router;
