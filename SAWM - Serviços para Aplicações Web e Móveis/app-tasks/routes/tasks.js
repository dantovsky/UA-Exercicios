var express = require('express');
var router = express.Router();

const tasks = [
  { id: 1, name: "Estudar React", description: "Estudar React pelo curso do Youtube.", status: "0" },
  { id: 2, name: "Passear com o Leo", description: "Passear com o Leo de bicicleta na ria de Aveiro e passar no Forum para tomar açaí.", status: "0" },
  { id: 3, name: "Comprar o bolo", description: "Comprar o bolo do aniversário para a vovó.", status: "0" },
  { id: 4, name: 'Estudar Vue', description: 'Curso de VueJS pela Cod3r.', status: "0" },
  { id: 5, name: 'Dançar com a Carol', description: 'Dançar com a Carol quando ela precisar dormir à tarde.', status: "0" },
]

// Get all tasks » Endpoint http://localhost:3000/tasks
router.get('/', function(req, res, next) {
  res.json(tasks);
});

// Get task by ID
router.get('/:id', function(req, res, next) {
  for(let task of tasks) {
    if(task.id == req.params.id) {
      res.status(200).json(task);
      return;
    }
  }

  res.status(404).send("Task not found")
});

module.exports = router;
