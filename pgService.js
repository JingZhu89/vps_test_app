const pgp = require('pg-promise')();
const db = pgp(`postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@localhost:5432/plant_site`);

const getAllPlants = async () => {
  return await db.many('SELECT * FROM plants')
}

const getPlant= async (id) => {
  return await db.one('SELECT * FROM plants WHERE plant_id = $1', id);
}

const insertPlant = async (data) => {
  return await db.none('INSERT INTO plants(plant_name, planted_date, water_frequency, last_watered_date, plant_diary)' + 
  'VALUES(${plantName}, ${plantedDate}, ${waterFrequency}, ${lastWateredDate}, ${plantDiary})', {
    plantName: data.plantName,
    plantedDate: data.plantedDate,
    waterFrequency: data.waterFrequency,
    lastWateredDate: data.lastWateredDate,
    plantDiary: data.plantDiary
  })
}

const updatePlant = async (id, data) => {
  return await db.none('UPDATE plants SET last_watered_date = ${lastWateredDate}, plant_diary = ${plantDiary} WHERE plant_id = ${plantId}', {
    lastWateredDate: data.lastWateredDate,
    plantDiary: data.plantDiary,
    plantId: id
  })
}

const deletePlant = async (id) => {
  return await db.none('DELETE FROM plants WHERE plant_id = $1', id)
}

module.exports = {updatePlant, insertPlant, getPlant, deletePlant, getAllPlants}