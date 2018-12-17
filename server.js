const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');

// Controllers
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const addTodo = require('./controllers/addTodo');
const removeTodo = require('./controllers/removeTodo');
const removeDoneTodo = require('./controllers/removeDoneTodo');

const getters = require('./getters');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'mikkelwestermann',
    password: '',
    database: 'simply-todos'
  }
})

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/requesttodos', (req, res) => {
  getters.getTodos(req, res, req.body.input, db)
    .then(todos => res.json({
      todos: todos,
      success: 'success'
    }));
})

app.post('/requestdonetodos', (req, res) => {
  getters.getDoneTodos(req, res, req.body.input, db)
    .then(todos => res.json({
      todos: todos,
      success: 'success'
    }));
})

app.post('/addtodo', (req, res) => { addTodo.handleAddTodo(req, res, db) })

app.post('/removetodo', (req, res) => { removeTodo.handleRemoveTodo(req, res, db) })

app.post('/removedonetodo', (req, res) => { removeDoneTodo.handleRemoveDoneTodo(req, res, db) })

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
