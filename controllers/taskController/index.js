const { createTypeTask, startTask } = require('../../middlewares');
const { getExecutingTask, findLatestTask } = require('./controller');
const dayjs = require('dayjs');

/**
 * code 1 有任务在执行
 * code 2 无任务在执行
 * @returns
 */
async function findTaskState() {
  const taskInfo = await getExecutingTask();
  if (taskInfo) {
    return {
      code: 1,
      /** 任务创建时间 */
      creationTime: taskInfo.time,
      success: taskInfo.success,
    };
  } else {
    let task = await findLatestTask();

    if (task) {
      const { time, success } = task;
      /** 距离上次任务的时间 */
      const difference = dayjs().valueOf() - dayjs(time).valueOf();
      return { code: 2, time, success, difference };
    } else {
      return { code: 3, message: 'task not created}' };
    }
  }
}

async function createTask(req, res) {
  const { state, data, message } = await createTypeTask({ type: 0 });
  if (state === 3) {
    const { taskID, time, taskQueue, taskActuator } = data;
    startTask({ taskID, taskQueue, taskActuator });
    res.json({ code: 200, data: { taskID, time } });
  } else {
    res.json({ code: 200, message });
  }
}

async function findTask(req, res) {
  const { code, time, success, difference } = await findTaskState();

  const isExecuting = code === 1 ? true : false;

  res.json({
    code: 200,
    data: {
      isExecuting,
      success,
      time,
      difference,
      success,
    },
  });
}

module.exports = {
  createTask,
  findTask,
};
