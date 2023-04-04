const { createTypeTask, startTask } = require('../../middlewares');
const { getNewTask, getExecutedTaskList } = require('./controller');

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

async function findNewTask(req, res) {
  const data = await getNewTask();
  res.json({ code: 200, data });
}

async function findAllTask(req, res) {
  const data = await getExecutedTaskList();
  res.json({ code: 200, data });
}

module.exports = {
  createTask,
  findNewTask,
  findAllTask,
};
