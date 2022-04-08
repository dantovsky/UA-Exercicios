var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/sum/:a/:b', function(req, res, next) {
  sum = parseInt(req.params.a) + parseInt(req.params.b)
  res.send('' + sum);
});

module.exports = router;
