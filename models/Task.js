const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Task', taskSchema);
