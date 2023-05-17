const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGOURI;

console.log('connecting to', url);

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const plantTipsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A name is required'],
  },
  tips: {
    type: String,
    required: [true, 'A tip is required'],
  },
});

plantTipsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('tips', plantTipsSchema);
