const { openBrowser, closeBrowser } = require('./browser');

// 任务计数器
const INIT = 0;
let cnt = INIT;
// 任务数量
let MAX = 0;
// 是否有任务在执行
let locks = false;
// 同时执行的异步任务数量
const CONCURRENCY = 3;

function taskState() {
  if (locks) {
    return {
      cnt,
      MAX,
    };
  } else {
    return false;
  }
}
function taskInfo() {
  return {
    time: 0,
    count: 0,
    success: 0,
    failed: 0,
  };
}
function resetTaskState() {
  locks = false;
  cnt = 0;
}

async function executeAsyncTask(taskList, fn) {
  MAX = taskList.length;

  let promises = [];

  for (let i = 0; i < CONCURRENCY; i++) {
    locks = true;
    let p = new Promise((resolve) => {
      (async function loop(index, page) {
        if (!page) {
          page = await openBrowser();
        }
        if (index < MAX) {
          await fn(taskList[index], page, index);
          loop(cnt++, page);
          return;
        }
        resolve();
      })(cnt++);
    });
    promises.push(p);
  }

  await Promise.all(promises);
  console.log('任务执行结束');

  console.log('开始关闭浏览器');
  await closeBrowser();
  resetTaskState();

  return;
}

module.exports = { executeAsyncTask, taskState, taskInfo };
