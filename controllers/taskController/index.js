const { createTypeTask, startTask } = require('../../middlewares');

const { getExecutingTask, findLatestTask } = require('./controller');

const dayjs = require('dayjs');

async function findTaskState() {
  const result = await getExecutingTask(null);
  if (result && result.length > 0) {
    return {
      code: 1,
      message: '任务正在执行',
    };
  } else {
    const { creationTime, success } = await findLatestTask();
    const difference = dayjs().valueOf() - dayjs(creationTime).valueOf();
    return { code: 2, creationTime, success, difference };
  }
}

async function createTask(req, res) {
  const {
    code,
    message,
    creationTime: ctime,
    success: count,
    difference,
  } = await findTaskState();

  if (code === 1) {
    res.json({
      code: 200,
      data: {
        status: false,
        message,
      },
    });
  } else if (code === 2) {
    if (difference >= 2 * 60 * 60 * 1000) {
      const { _id, creationTime, taskFN } = await createTypeTask(0);
      startTask(_id, taskFN);
      res.json({
        code: 200,
        data: {
          status: true,
          _id,
          creationTime,
        },
      });
    } else {
      res.json({ code: 201, message: '技能冷却中' });
    }
  }
}

async function findTask(req, res) {
  const { code, message, creationTime, success, difference } =
    await findTaskState();
  if (code === 1) {
    res.json({
      code: 200,
      data: {
        status: false,
        message,
      },
    });
  } else if (code === 2) {
    res.json({
      code: 200,
      data: {
        status: true,
        success,
        creationTime,
        difference,
        success,
      },
    });
  }

  res.json({
    code: 200,
    data: {
      _id,
      creationTime,
    },
  });
}

module.exports = {
  createTask,
  findTask,
};
