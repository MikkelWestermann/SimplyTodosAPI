const handleSignin = (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json('Incorrect Form Submission');
  }
  db.select('email', 'hash').from('users').where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return res.json({
          email: email,
          success: 'success'
        });
      } else {
        res.status(400).json('Wrong Credentials');
      }
    })
    .catch(error => res.status(400).json('Wrong Credentials'));
}

module.exports = {
  handleSignin: handleSignin
}
