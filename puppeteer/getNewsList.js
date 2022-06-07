const puppeteer = require('puppeteer')
async function getNewsList (url, selector) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url)

  let links = await page.$$eval(selector, els => els.map(el => el.href))
  await browser.close()

  return links
}

module.exports = getNewsList
