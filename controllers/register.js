const handleRegister = (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  if(!email || !password) {
    return res.status(400).json('incorrect form submission');
  }
  const hash = bcrypt.hashSync(password);
  db.transaction(trx => {
    trx.insert({
      hash: hash,
      email: email
    })
    .into('users')
    .returning('email')
    .then(email => res.json({
      email: email[0],
      success: 'success'
    }))
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .catch(err => res.status(400).json(err));
}

module.exports = {
  handleRegister: handleRegister
}
