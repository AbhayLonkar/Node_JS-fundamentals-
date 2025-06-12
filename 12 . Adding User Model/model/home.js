const { mongoose } = require('mongoose');
const Favourite = require('./favourite');

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

homeSchema.pre('findOneAndDelete', async function (next) {
  const homeId = this.getQuery()._id;
  await Favourite.deleteOne({ homeId });
  next();
});

module.exports = mongoose.model('Home', homeSchema);