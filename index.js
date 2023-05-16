const dotenv = require('dotenv');
dotenv.config()
const cors = require('cors');
const express = require('express');
const dbService = require('./dbService.js')
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('build'));

//read all
app.get('/api', async (req, res) => {
  try {
    const dbResponse = await dbService.getAllPlants()
    res.send(dbResponse);
  } catch(err) {
    res.send('Opps ' + err.message)
  }
})

//read one
app.get('/api/:id', async (req, res) => {
  const id = req.params.id
  try {
    const dbResponse = await dbService.getPlant(id)
    res.send(dbResponse);
  } catch(err) {
    res.send('Opps ' + err.message)
  }
})

//create
app.post('/api', async (req, res) => {
  const data = req.body
  try {
    const dbResponse = await dbService.insertPlant(data)
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
    const dbResponse = await dbService.updatePlant(id, data)
    res.send(dbResponse);
  } catch(err) {
    res.send('Opps ' + err.message)
  }
})

//delete
app.delete('/api/:id', async (req, res) => {
  const id = req.params.id
  try {
    const dbResponse = await dbService.deletePlant(id)
    res.send(dbResponse);
  } catch(err) {
    res.send('Opps ' + err.message)
  }
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
