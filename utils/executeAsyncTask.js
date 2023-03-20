const { openBrowser, closeBrowser } = require('../puppeteer/browser');

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
    result: 0,
  };
}
function resetTaskState() {
  locks = false;
  cnt = 0;
}

async function executeAsyncTask(taskList, fn) {
  MAX = taskList.length;
  console.log(`共计${MAX}个任务`);

  const info = taskInfo();
  info.count = MAX;

  let promises = [];

  for (let i = 0; i < CONCURRENCY; i++) {
    locks = true;
    let p = new Promise((resolve) => {
      (async function loop(index, page) {
        const task = taskList[index];
        if (index < MAX) {
          if (!page) page = await openBrowser();

          const res = await fn(task, page, index);

          if (res.state) {
            info.success += 1;
            info.result += res.result;
          } else {
            info.failed += 1;
          }

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
  
  return info;
}

module.exports = { executeAsyncTask, taskState, taskInfo };
