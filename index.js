const dotenv = require('dotenv');
dotenv.config()
const cors = require('cors');
const express = require('express');
const pgService = require('./pgService.js')
const mgService = require('./mongoService.js')
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('build'));

//read all plants
app.get('/api', async (req, res) => {
  try {
    const dbResponse = await pgService.getAllPlants()
    res.send(dbResponse);
  } catch(err) {
    res.send('Opps ' + err.message)
  }
})

//read all tips
app.get('/api/tips', async (req, res) => {
  try {
    const dbResponse = await mgService.find({})
    res.json(dbResponse);
  } catch(err) {
    res.send('Opps ' + err.message)
  }
})

//add new tips
app.post('/api/tips', (req, res, next) => {
  const newTip = req.body;
  const tip = new mgService(newTip);
  tip.save()
    .then((savedTip) => res.json(savedTip))
    .catch((error) => next(error));
});

//read one plant
app.get('/api/:id', async (req, res) => {
  const id = req.params.id
  try {
    const dbResponse = await pgService.getPlant(id)
    res.send(dbResponse);
  } catch(err) {
    res.send('Opps ' + err.message)
  }
})

//create
app.post('/api', async (req, res) => {
  const data = req.body
  try {
    const dbResponse = await pgService.insertPlant(data)
    res.send(dbResponse);
  } catch(err) {
    res.send('Opps ' + err.message)
  }
})

//update
app.put('/api/:id', async (req, res) => {
  const data = req.body
  const id = req.params.id
  try {
    const dbResponse = await pgService.updatePlant(id, data)
    res.send(dbResponse);
  } catch(err) {
    res.send('Opps ' + err.message)
  }
})

//delete
app.delete('/api/:id', async (req, res) => {
  const id = req.params.id
  try {
    const dbResponse = await pgService.deletePlant(id)
    res.send(dbResponse);
  } catch(err) {
    res.send('Opps ' + err.message)
  }
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
