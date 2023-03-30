const { executeAsyncTask } = require('../../utils');
const {
  updateTaskInfo,
} = require('../../controllers/taskController/controller');
/**
 *
 * @param {*} taskID 任务 _id
 * @param {*} taskQueue 任务队列
 * @param {*} taskActuator 任务执行器
 * @param {*} type 任务类型
 * @returns
 */
async function executeTask(taskID, taskQueue, taskActuator, type = 0) {
  if (typeof taskActuator === 'function') {
    // 任务开始执行时间
    const time = new Date();

    // 开始执行异步任务
    const tip = type ? '开始执行获取新闻内容任务' : '开始执行获取新闻链接任务';
    console.log(tip);

    const info = await executeAsyncTask(taskQueue, taskActuator);

    // 计算任务耗时
    info.elapsedTime = new Date() - time;
    if (!type) {
      // 链接任务
    
    } else {
      // 内容任务
    }

    // 把任务状态改成已完成
    info.state = 1;
    // 更新任务状态
    await updateTaskInfo(taskID, info);

    console.log(info);

    return info;
  } else return false;
}

module.exports = {
  executeTask,
};
