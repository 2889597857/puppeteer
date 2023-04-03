const { createTypeTask } = require('./createTask');
const { executeTask, updateTaskState } = require('./executeTask');

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

  return await executeTask(taskID, taskQueue, taskActuator, type);
}

/**
 * 传入链接任务并执行，
 * 根据执行结果（是否获取到新连接），
 * 决定是否执行获取内容任务
 * @param {string} _id
 * @param {function} taskQueue
 * @returns
 */
async function startTask(taskID, taskActuator, taskQueue) {
  await executeTask(taskID, taskActuator, taskQueue);
  const contentTask = await createAndExecuteTypeTask(1);
  if (!contentTask) updateTaskState({ taskID, state: 3 });
  return;
}

module.exports = {
  createTypeTask,
  executeTask,
  startTask,
  createAndExecuteTypeTask,
};
