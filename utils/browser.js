const puppeteer = require('puppeteer');
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

async function closeBrowser() {
  return new Promise(async (resolve, reject) => {
    for (let i = 0; i < caches.length; i++) {
      try {
        await caches[i].close();
        console.log(`关闭浏览器${i + 1}`);
      } catch {
        console.log(`关闭浏览器${i + 1}失败`);
      }
    }
    cleanCache();
    resolve();
  });
}

function cleanCache() {
  caches.length = 0;
}

module.exports = { openBrowser, closeBrowser, cleanCache, caches };
