const dayjs = require('dayjs');

const {
  createLinkTask,
  getLink,
  createContentTask,
  getContent,
} = require('../crawler');

const {
  getExecutingTask,
  addTask,
} = require('../../controllers/taskController/controller');

const { executeAsyncTask, taskInfo } = require('../../utils');

const LinkListModel = require('../../models/linkListModel');

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
  if (isExecuting.length !== 0) return false;

  const taskQueue = type ? createContentTask() : createLinkTask();

  if (taskQueue.length > 0) {
    // 没有正在执行的任务，创建新任务
    const result = await addTask({
      creationTime: dayjs().format(),
      state: 0,
      type,
    });

    const taskActuator = type ? getContent : getLink;

    const { _id: taskID } = result[0];

    return { taskID, taskQueue, taskActuator };
  } else {
    return false;
  }
}

async function executeTask(_id, taskQueue, taskActuator, type) {
  if (typeof taskActuator === 'function') {
    // 任务开始执行事件
    let time = new Date();
    // 开始执行异步任务
    const tip = type ? '开始执行获取新闻内容任务' : '开始执行获取新闻链接任务';
    console.log(tip);
    const info = await executeAsyncTask(taskQueue, taskActuator);

    // 计算任务耗时
    info.elapsedTime = new Date() - time;
    // 把任务状态改成已完成
    info.state = 1;
    // 更新任务状态
    await updateTaskInfo(_id, info);
    console.log(info);

    return info;

    return await taskFN(_id);
  } else return false;
}

/**
 * 创建获取链接或获取内容任务
 * @param {*} type 0 / 1
 * @returns
 */
async function createTypeTask(type) {
  return await createTask(type);
}

/**
 * 0 启动链接任务
 * 1 启动内容任务
 * @param {number} type 0 | 1
 * @returns
 */
async function createAndExecuteTypeTask(type) {
  const { _id, taskFN } = await createTypeTask(type);
  console.log(taskFN);
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
  await executeTask(_id, taskFN);
  const result = await LinkListModel.count({ state: 0 });
  console.log(result);
  if (result && result > 0) {
    return await createAndExecuteTypeTask(1);
  } else return;
}

async function start() {
  await createAndExecuteTypeTask(0);
  const result = await LinkListModel.count({ state: 0 });
  console.log(result);
  if (result && result > 0) {
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
