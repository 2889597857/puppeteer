const puppeteer = require('puppeteer');

async function openBrowser() {
  const browser = await puppeteer.connect({
    browserWSEndpoint: 'ws://localhost:3000',
  });
  const page = await browser.newPage();

  await page.goto('http://www.baidu.com/');
  const a = await page.$eval('title', (el) =>
    el.innerText.trim().split(/[-_]/)[0].trim()
  );
  console.log(a);
  await browser.disconnect();
}
openBrowser();
