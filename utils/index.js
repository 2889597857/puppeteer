const puppeteer = require('puppeteer');
const getTopURL = (url) => url.replace(/^https?:\/\/(.*?)(:\d+)?\/.*$/, '$1');

/**
 * 验证 _id 是否合法
 * @param {string} id
 * @returns
 */
function verifyID(id) {
  // mongoose.Types.ObjectId.isValid(id)
  return /^[a-fA-F0-9]{24}$/.test(id);
}

function taskInfo() {
  return {
    time: 0,
    count: 0,
    success: 0,
    failed: 0,
  };
}
// 任务计数器
const INIT = 0;
let cnt = INIT;
// 任务数量
let MAX = 0;
// 是否有任务在执行
let locks = false;

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
// 浏览器页面。一个任务一个浏览器
const caches = [];

async function openBrowser() {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: true,
    timeout: 1000,
  });
  caches.push(browser);
  return await browser.newPage();
}

async function executeAsyncTask(taskList, fn) {
  MAX = taskList.length;
  // 同时执行的异步任务数量
  const CONCURRENCY = 3;

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
  for (let i = 0; i < caches.length; i++) {
    try {
      await caches[i].close();
      console.log(`关闭浏览器${i + 1}`);
    } catch {
      console.log(`关闭浏览器${i + 1}失败`);
    }
  }

  locks = false;
  cnt = 0;
  caches.length = 0;
}

module.exports = {
  getTopURL,
  executeAsyncTask,
  verifyID,
  taskState,
  taskInfo,
  openBrowser,
  caches,
};
