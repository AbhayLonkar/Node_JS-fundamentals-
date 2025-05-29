const { mongoose } = require('mongoose');

const homeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  photoUrl: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Home', homeSchema);