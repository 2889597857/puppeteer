const puppeteer = require('puppeteer');
// 浏览器页面。一个任务一个浏览器
const caches = [];

async function openBrowser(cache = true) {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox', // 禁用setuid沙箱(Linux)。
      `--disable-notifications=true`, // 关闭浏览器通知提示
      `--blink-settings=imagesEnabled=false`, // 禁止加载图片
    ],
    headless: true,
    timeout: 1000,
  });
  if (cache) caches.push(browser);
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

  // for await (const browser of caches) {
  //   try {
  //     await browser.close();
  //     console.log(`关闭浏览器${i + 1}`);
  //   } catch {
  //     console.log(`关闭浏览器${i + 1}失败`);
  //   }
  // }
}

function cleanCache() {
  caches.length = 0;
}

module.exports = { openBrowser, closeBrowser, cleanCache, caches };
