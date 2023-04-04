const { createTypeTask } = require('./createTask');
const { executeTask, updateTaskState } = require('./executeTask');

/**
 * 0 启动链接任务
 * 1 启动内容任务
 * @param {number} type 0 | 1
 * @returns
 */
async function createAndExecuteTypeTask({ taskID, type }) {
  const task = await createTypeTask({ taskID, type });
  if (task.state == 3) {
    const { taskQueue, taskActuator } = task.data;
    return await executeTask({ taskID, taskQueue, taskActuator }, type);
  } else {
    return false;
  }
}

/**
 * 传入链接任务并执行，
 * 根据执行结果（是否获取到新连接），
 * 决定是否执行获取内容任务
 * @param {string} _id
 * @param {function} taskQueue
 * @returns
 */
async function startTask({ taskID, taskQueue, taskActuator }) {
  await executeTask({ taskID, taskQueue, taskActuator });
  const contentTask = await createAndExecuteTypeTask({ taskID, type: 1 });
  if (!contentTask) updateTaskState({ taskID, state: 4 });
  return;
}

module.exports = {
  createTypeTask,
  executeTask,
  startTask,
  createAndExecuteTypeTask,
};
