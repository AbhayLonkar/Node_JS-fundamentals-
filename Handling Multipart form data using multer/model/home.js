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
<<<<<<< HEAD
    // required: true
=======
>>>>>>> ad316ab243584f617a4814f6db83bd1dc1d30a1b
  }
});

// homeSchema.pre('findOneAndDelete', async function (next) {
//   const homeId = this.getQuery()._id;
//   await Favourite.deleteOne({ homeId });
//   next();
// });

module.exports = mongoose.model('Home', homeSchema);