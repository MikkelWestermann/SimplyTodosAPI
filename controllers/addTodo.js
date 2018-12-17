const handleAddTodo = (req, res, db) => {
  const { email, todo } = req.body;
  if (!email || !todo) {
    return res.status(400).json('Incorrect for submission');
  }
  db.transaction(trx => {
    trx.insert({
      email,
      todo
    })
    .into('todos')
    .returning('todo')
    .then(todo => res.json({
      todo: todo[0],
      success: 'success'
    }))
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .catch(error => res.status(400).json(error))
}

module.exports = {
  handleAddTodo: handleAddTodo
}
