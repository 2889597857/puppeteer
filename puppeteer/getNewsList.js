const openBrowser = require('./browser')

async function getNewsList (url, selector) {
  let links = null
  try {
    const browser = await openBrowser()
    const page = await browser.newPage()
    await page.goto(url)

    links = await page.$$eval(selector, els => els.map(el => el.href))
    await browser.close()

    return {
      state: true,
      links
    }
  } catch (error) {
    return {
      state: false,
      error
    }
  }
}
module.exports = getNewsList
