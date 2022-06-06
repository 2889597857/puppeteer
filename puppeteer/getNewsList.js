const puppeteer = require('puppeteer')
const dayjs = require('dayjs')

const { linkList } = require('./pageInfo')
async function getNewsList (url, selector) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url)

  let links = await page.$$eval(selector, els => els.map(el => el.href))
  await browser.close()

  return links
}
let num = 3
getNewsList(linkList[num].link, linkList[num].selector)
module.exports = getNewsList
