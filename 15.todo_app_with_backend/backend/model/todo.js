const { mongoose } = require('mongoose');

const todoSchema = new mongoose.Schema({
  tasks: {
    type: String,
    required: true
  },
  date: String,
  completed: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('TODO', todoSchema);