const express = require('express');
const pgp = require('pg-promise')();
const db = pgp('postgres://postgres:password@localhost:5432/plant_site');
const app = express();

app.get('/app', (req, res) => {
  db.many('SELECT id, plant_name, water_frequency, to_be_watered_date FROM plants')
  .then((data) => {
    res.send(data);
    console.log(data);
  })
  .catch((error) => {
    console.log('ERROR:', error);
  })
})

app.get('/app/:id', (req, res) => {
  db.one('SELECT * FROM plants WHERE plant_id = $1', 1)
  .then((data) => {
    res.send(data);
    console.log(data);
  })
  .catch((error) => {
    console.log('ERROR:', error);
  })
})


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
