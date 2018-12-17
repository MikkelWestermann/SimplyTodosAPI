const getTodos = (req, res, email, db) => {
  return db.select('todo').from('todos').where('email', '=', email)
    .then(data => {
      return data.map(todo => {
        return todo.todo;
      })
    })
}

const getDoneTodos = (req, res, email, db) => {
  return db.select('todo').from('done_todos').where('email', '=', email)
    .then(data => {
      return data.map(todo => {
        return todo.todo;
      })
    })
}

module.exports = {
  getTodos: getTodos,
  getDoneTodos: getDoneTodos
}
