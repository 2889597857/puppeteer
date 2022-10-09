const TaskModel = require('../models/taskModel');

async function addTask(options) {
  return await TaskModel.insertMany([options]);
}
/**
 * 0 链接任务
 * 1 内容任务
 * 2 全部任务
 * @param {number} type
 * @returns
 */
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

async function updateTaskInfo(_id, info) {
  await TaskModel.findOneAndUpdate({ _id }, info, { new: true });
}

async function getExecutingTask(type) {
  return await TaskModel.find({ type, state: 0 });
}

module.exports = { addTask, getTaskList, getExecutingTask, updateTaskInfo };

// getExecutingTask(1).then((res) => console.log(res));

