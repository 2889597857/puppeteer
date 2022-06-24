async function getNewsList (url, selector,page) {
  let links = null
  try {
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
