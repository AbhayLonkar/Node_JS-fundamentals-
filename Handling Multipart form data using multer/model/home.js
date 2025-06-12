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
  photo: {
    type: String,
  }
});

// homeSchema.pre('findOneAndDelete', async function (next) {
//   const homeId = this.getQuery()._id;
//   await Favourite.deleteOne({ homeId });
//   next();
// });

module.exports = mongoose.model('Home', homeSchema);