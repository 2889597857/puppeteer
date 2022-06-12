const { fail } = require('assert')
const mongoose = require('../config/mongoose')
const TaskSchema = mongoose.Schema({
  id: {
    type: Number
  },
  name: String,
  description: String,
  time: Date,
  success: Number,
  failed: Number
})

const TaskModel = mongoose.model('TaskSchema', TaskSchema, 'task')

module.exports = TaskModel
