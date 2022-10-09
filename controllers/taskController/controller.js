const TaskModel = require('../../models/taskModel');

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
/**
 * 更新任务信息
 * @param {string} _id
 * @param {object} info
 */
async function updateTaskInfo(_id, info) {
  await TaskModel.findOneAndUpdate({ _id }, info, { new: true });
}
/**
 * 获取正在执行的任务
 * null 全部
 * 0 链接任务
 * 1 内容任务
 * @param {null|number} type
 * @returns
 */
async function getExecutingTask(type) {
  const options = type == null ? { state: 0 } : { type, state: 0 };
  return await TaskModel.find(options);
}

module.exports = { addTask, getTaskList, getExecutingTask, updateTaskInfo };

// getExecutingTask(1).then((res) => console.log(res));
