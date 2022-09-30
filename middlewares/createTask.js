const { addTask } = require('../controllers/taskController');
const { contentStart, linksStart } = require('../start');
const {
  getTaskList,
  getExecutingTask,
} = require('../controllers/taskController');
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

  type ? contentStart(_id) : linksStart(_id);

  return { _id, creationTime };
}

module.exports = { createTask };
