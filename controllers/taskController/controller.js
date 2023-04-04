const TaskModel = require('../../models/taskModel');

async function addTask(options) {
  try {
    return await TaskModel.create(options);
  } catch (error) {
    return false;
  }
}
async function deleteTask(_id) {
  try {
    return await TaskModel.findByIdAndDelete(_id);
  } catch (error) {
    return false;
  }
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
 * @param {null|number} type
 * @returns
 */
async function getExecutingTask(type = 3) {
  return await TaskModel.findOne({ state: type }).sort({
    time: -1,
  });
}
/**
 * 获取上次执行任务
 * @param {null|number} type
 * @returns
 */
async function findLatestTask() {
  return await getExecutingTask();
}

async function findTaskByID(_id) {
  return await TaskModel.findById(_id);
}

module.exports = {
  addTask,
  deleteTask,
  getTaskList,
  getExecutingTask,
  updateTaskInfo,
  findLatestTask,
  findTaskByID,
};
