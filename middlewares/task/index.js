const { createTypeTask, createTask } = require('./createTask');
const { executeTask } = require('./executeTask');

/**
 * 0 启动链接任务
 * 1 启动内容任务
 * @param {number} type 0 | 1
 * @returns
 */
async function createAndExecuteTypeTask(type) {
  const task = await createTypeTask(type);

  if (!task) return false;

  const { taskID, taskQueue, taskActuator } = task;

  return await executeTask(taskID, taskQueue, taskActuator);
}

/**
 * 传入链接任务并执行，
 * 根据执行结果（是否获取到新连接），
 * 决定是否执行获取内容任务
 * @param {string} _id
 * @param {function} taskQueue
 * @returns
 */
async function startTask(_id, taskQueue) {
  const result = await executeTask(_id, taskQueue);
  console.log(result);
  return await createAndExecuteTypeTask(1);
}

module.exports = {
  createTypeTask,
  executeTask,
  startTask,
  createAndExecuteTypeTask,
};

// createTask().then((res) => console.log(res));