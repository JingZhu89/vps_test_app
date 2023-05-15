const dotenv = require('dotenv');
dotenv.config()
const cors = require('cors');
const express = require('express');
const pgp = require('pg-promise')();
const db = pgp(`postgres://${process.env.DBUSER}:${process.env.DBPASSWORD}@localhost:5432/plant_site`);
const app = express();
app.use(express.json());
app.use(cors());

//read all
app.get('/', async (req, res) => {
  const dbResponse = await db.many('SELECT * FROM plants');
  res.send(dbResponse);
})

//read one
app.get('/:id', async (req, res) => {
  const dbResponse = await db.one('SELECT * FROM plants WHERE plant_id = $1', 1);
  res.send(dbResponse);
})

//create
app.post('/', async (req, res) => {
  const data = req.body
  await db.none('INSERT INTO plants(plant_name, planted_date, water_frequency, last_watered_date, plant_diary)' + 
  'VALUES(${plantName}, ${plantedDate}, ${waterFrequency}, ${lastWateredDate}, ${plantDiary})', {
    plantName: data.plantName,
    plantedDate: data.plantedDate,
    waterFrequency: data.waterFrequency,
    lastWateredDate: data.lastWateredDate,
    plantDiary: data.plantDiary
  })
  res.send("done")
})

//update
app.put('/:id', async (req, res) => {
  const data = req.body
  const id = req.params.id
  console.log("put req data", data)
  await db.none('UPDATE plants SET plant_name = ${plantName}, planted_date = ${plantedDate},' + 
  'water_frequency = ${waterFrequency}, last_watered_date = ${lastWateredDate}, plant_diary = ${plantDiary} WHERE plant_id = ${plantId}', {
    plantName: data.plantName,
    plantedDate: data.plantedDate,
    waterFrequency: data.waterFrequency,
    lastWateredDate: data.lastWateredDate,
    plantDiary: data.plantDiary,
    plantId: id
  })
  res.send("updated")
})

//delete
app.delete('/:id', async (req, res) => {
  await db.none('DELETE FROM plants WHERE plant_id = $1', req.params.id)
  res.send("deleted")
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
