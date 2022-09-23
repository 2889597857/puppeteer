const TaskModel = require('../models/taskModel');

async function addTask(options) {
  return await TaskModel.insertMany([options]);
}

async function getTaskList(type) {
  if (type == 2) {
    return await TaskModel.find({}, { __v: 0, type: 0 });
  } else {
    return await TaskModel.find(
      { type: { $gte: type, $lt: ++type } },
      { __v: 0, type: 0 }
    );
  }
}

async function updateTaskInfo(_id,info) {
  TaskModel.updateOne(_id, {});
}

async function getExecutingTask(type) {
  return await TaskModel.find({ type, state: 1 });
}

module.exports = { addTask, getTaskList, getExecutingTask, updateTaskInfo };

// getExecutingTask(1).then((res) => console.log(res));
