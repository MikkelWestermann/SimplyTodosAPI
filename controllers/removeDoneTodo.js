const getters = require('../getters');

const handleRemoveDoneTodo = (req, res, db) => {
  let { email, todo } = req.body;
  if (typeof todo === 'object') {
    todo = todo[0];
  }
  db.from('done_todos').where('todo', '=', todo)
    .del()
    .then(() => getters.getDoneTodos(req, res, email, db))
    .then(data => {
      res.json({
        doneTodos: data,
        success: 'success'
      })
    })
}

module.exports = {
  handleRemoveDoneTodo: handleRemoveDoneTodo
}
