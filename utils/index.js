const puppeteer = require('puppeteer');
const getTopURL = (url) => url.replace(/^https?:\/\/(.*?)(:\d+)?\/.*$/, '$1');

// 浏览器 
const caches = [];
async function openBrowser() {
  const browser = await puppeteer.launch({ timeout:1000 });
  caches.push(browser);
  return browser.newPage();
}

async function executeAsyncTask(taskList, fn) {
  const INIT = 0;
  // 任务数量
  const MAX = taskList.length;
  // 同时执行的异步人任务数量
  const CONCURRENCY = 3;

  let cnt = INIT;
  let promises = [];

  for (let i = 0; i < CONCURRENCY; i++) {
    let p = new Promise((resolve) => {
      (async function loop(index, page) {
        if (!page) {
         page = await openBrowser()
        }
        if (index < MAX) {
          console.log(`任务${cnt}`);
          await fn(taskList[index], page);
          loop(cnt++, page);
          return;
        }
        resolve();
      })(cnt++);
    });
    promises.push(p);
  }
  await Promise.all(promises);
  caches.map((el) => el.close());
}

module.exports = { getTopURL, executeAsyncTask };
