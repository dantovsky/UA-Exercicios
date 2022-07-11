var con = require('./connection')

// Q2.b
function addGarantia(req, res, next) {

    const { item, dataCompra, duracao, IDLocalCompra, Nota } = req.body
    const sql = `
    INSERT INTO Garantia (item, dataCompra, duracao, IDLocalCompra, Nota)
    VALUES (?, ?, ?, ?, ?)
    `
    con.query(sql, [item, dataCompra, duracao, IDLocalCompra, Nota], function (err, results) {
        if (err) throw err;
        res.status(201).json({ status: true, message: "Garantia inserida com sucesso" })
    })
}
// addGarantia()

// Q2.c
function listAllGarantiasAtivas(req, res, next) {

    const sql = `SELECT * from Garantia g
    WHERE CAST((g.dataCompra + g.duracao) as signed) > CAST(year(NOW()) as signed);
    `
    con.query(sql, function (err, results) {
        if (err) throw err;
        res.status(200).json({ status: true, message: "Listagem das garantias ativas", data: results })
    })
}
// listAllGarantiasAtivas()

// Q2.d
function listAllGarantiasSameLocal(req, res, next) {

    const { nomeLocal } = req.params
    const sql = `select * from Garantia g
    INNER JOIN LocalCompra l
    ON g.IDLocalCompra = l.IDCompra
    AND l.Cidade = ?;
    `
    con.query(sql, nomeLocal, function (err, results) {
        if (err) throw err;
        res.status(200).json({ status: true, message: "Listagem das garantias de um mesmo local (" + nomeLocal + ")", data: results })
    })
}
// listAllGarantiasSameLocal()

module.exports = { addGarantia, listAllGarantiasAtivas, listAllGarantiasSameLocal }




// // const sql = `
// INSERT INTO Garantia (id, item, dataCompra, duracao, IDLocalCompra, Nota)
// VALUES (6, 'Item from Dante', '2022-07-05', 3, 1, 'Boa compra')
// `
// {
// "id": "Camisa",
// "item": "Camisa",
// "dataCompra": "Camisa",
// "duracao": "Camisa",
// "IDLocalCompra": "Camisa",
// "Nota": "Camisa"
// }
