const getters = require('../getters');

const handleRemoveTodo = (req, res, db) => {
  const { email, todo, } = req.body;
  const insertDoneTodo = new Promise((resolve, reject) => {
    db.transaction(trx => {
      trx.insert({
        email: email,
        todo: todo
      })
      .into('done_todos')
      .returning('todo')
      .then(todo => resolve(todo))
      .then(trx.commit)
      .catch(trx.rollback)
    })
  })
  .catch(error => res.status(400).json(error))
  const deleteTodo = new Promise((resolve, reject) => {
    db.from('todos').where('todo', '=', todo)
      .del()
      .then(() => getters.getTodos(req, res, email, db))
      .then(data => resolve(data))
  })
  Promise.all([insertDoneTodo, deleteTodo])
    .then(data => {
      res.json({
        doneTodo: data[0],
        todos: data[1],
        success: 'success'
      })
    })
    .catch(err => res.status(400).json(err))
}

module.exports = {
  handleRemoveTodo: handleRemoveTodo
}
