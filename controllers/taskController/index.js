const { createTypeTask, startTask } = require('../../middlewares');

const { getExecutingTask, findLatestTask } = require('./controller');

const dayjs = require('dayjs');

async function findTaskState() {
  const result = await getExecutingTask(null);
  if (result && result.length > 0) {
    return {
      code: 1,
      creationTime: result[0].creationTime,
      success: '-',
    };
  } else {
    const { creationTime, success } = await findLatestTask();
    const difference = dayjs().valueOf() - dayjs(creationTime).valueOf();
    return { code: 2, creationTime, success, difference };
  }
}

async function createTask(req, res) {
  const { code, creationTime, success, difference } = await findTaskState();

  if (code === 1) {
    res.json({
      code: 200,
      data: {
        isExecuting: false,
        creationTime,
        success,
      },
    });
  } else if (code === 2) {
    if (difference >= 2 * 60 * 60 * 1000) {
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
