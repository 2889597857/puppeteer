const puppeteer = require('puppeteer')
const dayjs = require('dayjs')

async function getNewsInfo (url, selector) {
  const { titleSelect, timeSelector, contentSelector } = selector

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url)

  const pageTitle = await page.$eval(titleSelect, el => el.innerText.trim())
  const pageContent = await page.$eval(contentSelector, el =>
    el.innerText
      .split('\n')
      .filter(Boolean)
      .map(el => el.trim())
  )

  let pageTime = await page.$eval(timeSelector, el => el.innerText.trim())
  if (pageTime.includes('年')) {
    const reg = pageTime.match(
      /(\d*)年(\d*)月(\d*)日\s?([0-9]*:[0-9]*:?[0-9]*?)/
    )
    const year = reg[1]
    const mouth = reg[2]
    const day = reg[3]
    const time = reg[4]
    pageTime = dayjs(year + mouth + day + ' ' + time).format()
  } else {
    pageTime = dayjs(pageTime.match(/\d*-\d*-\d*.?\d*:\d*:?\d*?/g)).format()
  }

  await browser.close()
  return [pageTitle, dayjs(pageTime).format(), pageContent]
}
module.export = getNewsInfo
module.exports = {
  getNewsInfo
}