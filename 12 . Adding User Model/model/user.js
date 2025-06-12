const mongoose = require('mongoose');


const userShcema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    enum: ['host', 'regular'],
    default: 'regular'
  }
});


module.exports = mongoose.model('User', userShcema);