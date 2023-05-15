const dotenv = require('dotenv');
dotenv.config()
const express = require('express');
const pgp = require('pg-promise')();
const db = pgp(`postgres://${process.env.DBUSER}:${process.env.DBPASSWORD}@localhost:5432/plant_site`);
const app = express();
app.use(express.json());

//read all
app.get('/app', async(req, res) => {
  const dbResponse = await db.many('SELECT plant_id, plant_name, water_frequency, to_be_watered_date FROM plants');
  res.send(dbResponse);
})

//read one
app.get('/app/:id', async(req, res) => {
  const dbResponse = await db.one('SELECT * FROM plants WHERE plant_id = $1', 1);
  res.send(dbResponse);
})

//create
app.post('/app', async(req, res) => {
  const data = req.body
  await db.none('INSERT INTO plants(plant_name, planted_date, water_frequency, last_watered_date, to_be_watered_date, plant_diary)' + 
  'VALUES(${plantName}, ${plantedDate}, ${waterFrequency}, ${lastWateredDate}, ${toBeWateredDate}, ${plantDiary})', {
    plantName: data.plantName,
    plantedDate: data.plantedDate,
    waterFrequency: data.waterFrequency,
    lastWateredDate: data.lastWateredDate,
    toBeWateredDate: data.toBeWateredDate,
    plantDiary: data.plantDiary
  })
  res.send("done")
})

//update
app.put('/app/:id', async(req, res) => {
  const data = req.body
  const id = req.params.id
  console.log("put req data", data)
  await db.none('UPDATE plants SET plant_name = ${plantName}, planted_date = ${plantedDate},' + 
  'water_frequency = ${waterFrequency}, last_watered_date = ${lastWateredDate}, to_be_watered_date = ${toBeWateredDate}, plant_diary = ${plantDiary} WHERE plant_id = ${plantId}', {
    plantName: data.plantName,
    plantedDate: data.plantedDate,
    waterFrequency: data.waterFrequency,
    lastWateredDate: data.lastWateredDate,
    toBeWateredDate: data.toBeWateredDate,
    plantDiary: data.plantDiary,
    plantId: id
  })
  res.send("updated")
})

//delete
app.delete('/app/:id', async(req, res) => {
  await db.none('DELETE FROM plants WHERE plant_id = $1', req.params.id)
  res.send("deleted")
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
