const dayjs = require('dayjs');
const Env = require('../../config/env');

const {
  createAllLinkTask,
  getURL,
  createContentTask,
  getContent,
} = require('../crawler');

const {
  getExecutingTask,
  findLatestTask,
  addTask,
} = require('../../controllers/taskController/controller');

/**
 * 创建任务
 * 0 链接任务
 * 1 内容任务
 * @param {number} type
 * @returns
 */
async function createTask(type, cooldown = false) {
  // 查询是否有正在执行的任务
  // 0 获取链接任务  1 获取内容任务
  const isExecuting = await getExecutingTask();
  if (isExecuting) {
    return {
      state: 1,
      message: '任务正在进行中......',
    };
  }

  if (cooldown) {
    const coolTime = await calculateCoolDown();
    if (!coolTime) {
      return {
        state: 2,
        message: '技能冷却中......',
      };
    }
  }

  // 没有正在执行的任务，创建新任务
  const fn = type ? createContentTask : createAllLinkTask;
  const taskQueue = await fn();
  if (taskQueue && taskQueue.length > 0) {
    const result = await addTask({
      time: dayjs().format(),
      state: 0,
      type,
    });

    const { _id: taskID, creationTime } = result;

    const taskActuator = type ? getContent : getURL;

    return {
      state: 3,
      data: { taskID, creationTime, taskQueue, taskActuator },
    };
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
/**
 * 计算任务冷却时间
 * @returns 
 */
async function calculateCoolDown() {
  const coolTime = Env.Cool_Down * 60 * 1000;
  const info = await findLatestTask();
  return dayjs().valueOf() - dayjs(info.completed).valueOf() >= coolTime;
}

module.exports = {
  createTypeTask,
  createTask,
};
