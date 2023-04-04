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
async function getExecutingTypeTask(type = 3) {
  return await TaskModel.findOne({ state: type }).sort({
    time: -1,
  });
}
/**
 * 获取上次执行完成任务
 * @param {null|number} type
 * @returns
 */
async function findLatestTask() {
  return await getExecutingTypeTask();
}

async function findTaskByID(_id) {
  return await TaskModel.findById(_id);
}

async function getExecutingTaskList() {
  return await TaskModel.find({ state: { $lt: 3 } }).sort({
    time: -1,
  });
}

async function getExecutedTaskList(skip = 1) {
  return await TaskModel.find({ state: 3 })
    .sort({
      time: -1,
    })
    .skip(10 * skip)
    .limit(10);
}

async function getNewTask() {
  const task = await TaskModel.findOne().sort({
    time: -1,
  });
  
  if (!task) return [];
  
  const isExecuting = task.state < 3;
  return {
    isExecuting,
    ...task,
  };
}

module.exports = {
  addTask,
  deleteTask,
  getNewTask,
  getExecutingTypeTask,
  updateTaskInfo,
  findLatestTask,
  findTaskByID,
  getExecutingTaskList,
  getExecutedTaskList,
};
