const { createTypeTask, startTask } = require('../../middlewares');

const { getExecutingTask, findLatestTask } = require('./controller');

const dayjs = require('dayjs');
/**
 *
 * code 1 有任务在执行
 * code 2 无任务在执行
 * @returns
 */
async function findTaskState() {
  const result = await getExecutingTask(null);
  if (result && result.length > 0) {
    return {
      code: 1,
      /** 任务创建时间 */
      creationTime: result[0].creationTime,
      success: '-',
    };
  } else {
    let task = await findLatestTask();

    if (task) {
      const { creationTime, success } = task;
      /** 距离上次任务的时间 */
      const difference = dayjs().valueOf() - dayjs(creationTime).valueOf();
      return { code: 2, creationTime, success, difference };
    } else {
      return { code: 3, creationTime: '-', difference: '-', success: 0 };
    }
  }
}

async function createTask(req, res) {
  const { code, creationTime, success, difference } = await findTaskState();

  if (code === 1) {
    // 有任务在执行
    res.json({
      code: 200,
      data: {
        isExecuting: false,
        creationTime,
        success,
      },
    });
  } else if (code === 2) {
    // 无任务在执行
    // 两次任务执行时间要相差1小时
    if (difference >= 1 * 60 * 60 * 1000) {
      const { _id, creationTime, taskFN } = await createTypeTask(0);
      startTask(_id, taskFN);
      res.json({
        code: 200,
        data: {
          cooldown: true,
          creationTime,
        },
      });
    } else {
      res.json({
        code: 201,
        data: { cooldown: false },
        message: '技能冷却中',
      });
    }
  } else {
    const { _id, creationTime, taskFN } = await createTypeTask(0);
    startTask(_id, taskFN);
    res.json({
      code: 200,
      data: {
        cooldown: true,
        creationTime,
      },
    });
  }
}

async function findTask(req, res) {
  const { code, creationTime, success, difference } = await findTaskState();

  const isExecuting = code === 1 ? true : false;

  res.json({
    code: 200,
    data: {
      isExecuting,
      success,
      creationTime,
      difference,
      success,
    },
  });
}

module.exports = {
  createTask,
  findTask,
};
