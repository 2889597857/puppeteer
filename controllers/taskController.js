const TaskModel = require('../models/taskModel')

async function addTask (options) {
  return await TaskModel.insertMany([options])
}

async function getTaskList (type) {
  if (type == 2) {
    return await TaskModel.find({}, { __v: 0, type: 0 })
  } else {
    return await TaskModel.find(
      { type: { $gte: type, $lt: ++type } },
      { __v: 0, type: 0 }
    )
  }
}
module.exports = { addTask, getTaskList }
