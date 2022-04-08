var express = require('express');
var router = express.Router();
const fs = require('fs')
const path = require('path')

const taskList = [
  { id: 1, name: 'Estudar Vue', description: 'Curso de VueJS pela Cod3r.'},
  { id: 2, name: 'Passeio com o Leo', description: 'Passear com o Leo de bicicleta e depois toamr açaí.'},
  { id: 3, name: 'Dançar com a Carol', description: 'Dançar com a Carol quando ela precisar dormir à tarde.'},
]

/* GET tasks listing. */
router.get('/', function(req, res, next) {

  const taskList = [
    { id: 1, name: 'Estudar Vue', description: 'Curso de VueJS pela Cod3r.'},
    { id: 2, name: 'Passeio com o Leo', description: 'Passear com o Leo de bicicleta e depois toamr açaí.'},
    { id: 3, name: 'Dançar com a Carol', description: 'Dançar com a Carol quando ela precisar dormir à tarde.'},
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

// Lista todas as tasks
router.get('/api/tasks', function(req, res, next) {
  res.send(taskList)
});

// Pesquisa por um ID e exibe todo o documento encontrado
router.get('/api/tasks/:id', function(req, res, next) {
  // if(res.err) throw res.err
  try {
    res.send(taskList.find(t => t.id == req.params.id))
    // return taskList[req.params.id]
  } catch (error) {
    console.error(error)
    res.json({ message: req.params.id + ' não existe' })
  }
});

module.exports = router;
