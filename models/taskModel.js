const mongoose = require('../config/mongoose')
const TaskSchema = mongoose.Schema({
  name: String,
  description: String,
  creationTime: Date,
  success: Number,
  failed: Number,
  linkNumber: Number,
  type: Number
})

const TaskModel = mongoose.model('TaskSchema', TaskSchema, 'task')

module.exports = TaskModel
