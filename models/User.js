const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    min: 4,
    max: 16,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
    max: 1024,
    min: 8,
  },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
