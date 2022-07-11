var express = require('express');
var router = express.Router();
var functions = require('../dbFunctions')

// 3.a » POST :: add nova garantia
// Exemplo: http://localhost:3000/garantias
router.post('/', function (req, res, next) {
  const results = functions.addGarantia(req, res, next)
});

// 3.b » GET :: listar todas as garantias ativas
// http://localhost:3000/garantias/ativas
router.get('/ativas', function (req, res, next) {
  const results = functions.listAllGarantiasAtivas(req, res, next)
});

// 3.b » GET :: listar todas as garantias de um mesmo local
// Exemplo: http://localhost:3000/garantias/local/Aveiro
router.get('/local/:nomeLocal', function (req, res, next) {
  const results = functions.listAllGarantiasSameLocal(req, res, next)
});

module.exports = router;
