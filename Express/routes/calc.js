var express = require('express');
var router = express.Router();

// Sum
router.get('/sum/:x/:y', function(req, res, next) {
  res.send(`A soma de ${req.params.x} + ${req.params.y} = ${Number(req.params.x) + Number(req.params.y)}`);
});

// Sub
router.get('/sub/:x/:y', function(req, res, next) {
  res.send(`A subtração de ${req.params.x} + ${req.params.y} = ${Number(req.params.x) - Number(req.params.y)}`);
});

// Mult
router.get('/mult/:x/:y', function(req, res, next) {
  res.send(`A multiplicação de ${req.params.x} + ${req.params.y} = ${Number(req.params.x) * Number(req.params.y)}`);
});

// Div
router.get('/div/:x/:y', function(req, res, next) {
  res.send(`A divisão de ${req.params.x} + ${req.params.y} = ${Number(req.params.x) / Number(req.params.y)}`);
});

module.exports = router;
