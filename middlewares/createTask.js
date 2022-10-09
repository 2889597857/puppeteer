const { contentStart, linksStart } = require('../start');
const {
  getExecutingTask,
  addTask,
} = require('../controllers/taskController/controller');
const dayjs = require('dayjs');
/**
 * 0 链接任务
 * 1 内容任务
 * @param {number} type
 * @returns
 */
async function createTask(type) {
  // 查询是否有正在执行的任务
  // 0 获取链接任务  1 获取内容任务
  const isExecuting = await getExecutingTask(type);
  if (isExecuting.length !== 0) return false;
  // 创建任务
  const result = await addTask({
    creationTime: dayjs().format(),
    state: 0,
    type,
  });

  const { _id, creationTime } = result[0];

  const taskFN = type ? contentStart : linksStart;

  return { _id, creationTime, taskFN };
}

async function createTypeTask(type) {
  return await createTask(type);
}
/**
 * 开始执行任务
 * @param {string} _id
 * @param {function} taskFN
 * @returns
 */
async function executeTask(_id, taskFN) {
  if (typeof taskFN === 'function') {
    return await taskFN(_id);
  } else return false;
}
/**
 * 0 启动链接任务
 * 1 启动内容任务
 * @param {number} type 0 | 1
 * @returns
 */
async function createAndExecuteTypeTask(type) {
  const { _id, taskFN } = await createTypeTask(type);
  return await executeTask(_id, taskFN);
}

/**
 * 传入链接任务并执行，
 * 根据执行结果（是否获取到新连接），
 * 决定是否执行获取内容任务
 * @param {string} _id
 * @param {function} taskFN
 * @returns
 */
async function startTask(_id, taskFN) {
  const result = await executeTask(_id, taskFN);
  if (result.success > 0) {
    return await createAndExecuteTypeTask(1);
  } else return;
}

async function start() {
  const result = await createAndExecuteTypeTask(0);
  if (result && result.success > 0) {
    return await createAndExecuteTypeTask(1);
  } else return result;
}

module.exports = {
  createTypeTask,
  executeTask,
  startTask,
  createAndExecuteTypeTask,
  start,
};
