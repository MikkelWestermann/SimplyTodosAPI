const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

let todos = []; 

let doneTodos = [];

app.get('/', (req, res) => {
  res.json({
    todos: todos,
    doneTodos: doneTodos
  });
})

app.post('/addtodo', (req, res) => {
  todos.push(req.body.input);
  res.json(req.body.input);
})

app.post('/removetodo', (req, res) => {
  todos = todos.filter(todo => todo !== req.body.input);
  doneTodos.push(req.body.input);
  res.json({
    todos: todos,
    doneTodo: req.body.input
  })
})

app.post('/removedonetodo', (req, res) => {
  doneTodos = doneTodos.filter(todo => todo !== req.body.input);
  res.json(doneTodos);
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
})
