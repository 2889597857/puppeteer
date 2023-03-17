const { executeAsyncTask } = require('../../utils');
const {
  updateTaskInfo,
} = require('../../controllers/taskController/controller');

async function executeTask(_id, taskQueue, taskActuator, type) {
  if (typeof taskActuator === 'function') {
    // 任务开始执行时间
    const time = new Date();

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
  } else return false;
}

module.exports = {
  executeTask,
};
