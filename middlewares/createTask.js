const { addTask } = require('../controllers/taskController');
const { contentStart, linksStart } = require('../start');
const { getExecutingTask } = require('../controllers/taskController');
const dayjs = require('dayjs');

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

async function executeTask(_id, taskFN) {
  return await taskFN(_id);
}

async function startTask(_id, taskFN) {
  const result = await executeTask(_id, taskFN);
  if (result.success > 0) {
    const { _id, taskFN } = await createTask(1);
    return await executeTask(_id, taskFN);
  } else return;
}

module.exports = { createTask, executeTask, startTask };

async function start() {
  const { _id, taskFN } = await createTask(0);
  const result = await executeTask(_id, taskFN);
  console.log(result.success);
  if (result.success > 0) {
    const { _id, taskFN } = await createTask(1);
    return await executeTask(_id, taskFN);
  } else return;
}

start();
