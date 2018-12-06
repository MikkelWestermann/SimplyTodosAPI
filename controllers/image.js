const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '6fb0f5d251d04395894b2b8b6bb40c97'
});

const handleApicall = (req, res) => {
  app.models
    .predict (Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json("unable to work with API"))
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get entries'));
}

module.exports = {
  handleImage,
  handleApicall
}
