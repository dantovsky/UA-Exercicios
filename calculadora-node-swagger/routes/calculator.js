var express = require('express');
var router = express.Router();

/* Sum */
router.get('/sum/:a/:b', function(req, res, next) {
  const sum = Number(req.params.a) + Number(req.params.b)
  // res.json({reuslt: sum}); // res.send('' + sum);
  res.json({ operation: 'sum', result: sum });
});

/* Sub */
router.get('/sub/:a/:b', function(req, res, next) {
  const sub = Number(req.params.a) - Number(req.params.b)
  res.json({ operation: 'subtraction', result: sub });
});

/* Div */
router.get('/div/:a/:b', function(req, res, next) {
  const div = Number(req.params.a) / Number(req.params.b)
  res.json({ operation: 'division', result: div });
});

/* Mut */
router.get('/mult/:a/:b', function(req, res, next) {
  const mult = Number(req.params.a) * Number(req.params.b)
  res.json({ operation: 'mult', result: mult });
});

module.exports = router;
