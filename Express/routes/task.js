var express = require('express');
var router = express.Router();
const fs = require('fs')
const path = require('path')

/* GET tasks listing. */
router.get('/', function(req, res, next) {

  const taskList = [
    { name: 'Estudar Vue', description: 'Curso de VueJS pela Cod3r.'},
    { name: 'Passeio com o Leo', description: 'Passear com o Leo de bicicleta e depois toamr açaí.'},
    { name: 'Dançar com a Carol', description: 'Dançar com a Carol quando ela precisar dormir à tarde.'},
  ]

  res.render('task', { title: 'Task App', taskList });
  // fs.readFile(
  //   path.join(__dirname, 'public', 'index.html'),
  //   (err, content) => {
  //     if(err) throw err

  //     res.end(content)
  //   }
  // )
});

module.exports = router;
