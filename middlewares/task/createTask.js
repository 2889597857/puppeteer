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
  updateTaskInfo,
} = require('../../controllers/taskController/controller');

/**
 * 创建任务
 * 0 链接任务
 * 1 内容任务
 * @param {number} type
 * @returns
 */
async function createTask(type, taskID, cooldown = false) {
  // 查询是否有正在执行的任务
  // 0 获取链接任务  1 获取内容任务
  const _type = type == 1 ? 2 : 0;

  const isExecuting = await getExecutingTask(_type);

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
    const taskActuator = type ? getContent : getURL;

    let data;
    if (!taskID) {
      const result = await addTask({
        time: dayjs().format(),
        state: 0,
        type,
      });
      const { _id: taskID, time } = result;
      data = { taskID, time, taskQueue, taskActuator };
    } else {
      await updateTaskInfo(taskID, { state: 2 });
      data = { taskID, taskQueue, taskActuator };
    }

    return {
      state: 3,
      data,
    };
  } else {
    return {
      state: 4,
      message: 'task is null......',
    };
  }
}
/**
 * 创建获取链接或获取内容任务
 * @param {*} type 0 / 1
 * @returns
 */
async function createTypeTask({ type, taskID }) {
  return await createTask(type, taskID);
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
