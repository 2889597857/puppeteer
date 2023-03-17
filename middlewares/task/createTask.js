const dayjs = require('dayjs');

const {
  createAllLinkTask,
  getURL,
  createContentTask,
  getContent,
} = require('../crawler');

const {
  getExecutingTask,
  addTask,
} = require('../../controllers/taskController/controller');

/**
 * 创建任务
 * 0 链接任务
 * 1 内容任务
 * @param {number} type
 * @returns
 */
async function createTask(type) {
  // 查询是否有正在执行的任务
  // 0 获取链接任务  1 获取内容任务
  const isExecuting = await getExecutingTask(type);
  if (isExecuting) return false;

  // 没有正在执行的任务，创建新任务
  const fn = type ? createContentTask : createAllLinkTask;
  const taskQueue = await fn();

  if (taskQueue.length > 0) {
    const result = await addTask({
      creationTime: dayjs().format(),
      state: 0,
      type,
    });
    const { _id: taskID, creationTime } = result[0];

    const taskActuator = type ? getContent : getURL;

    return { taskID, creationTime, taskQueue, taskActuator };
  } else {
    return false;
  }
}

/**
 * 创建获取链接或获取内容任务
 * @param {*} type 0 / 1
 * @returns
 */
async function createTypeTask(type) {
  return await createTask(type);
}
module.exports = {
  createTypeTask,
  createTask
};
