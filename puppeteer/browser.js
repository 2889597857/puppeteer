const puppeteer = require('puppeteer')
async function openBrowser () {
  return await puppeteer.launch()
}
module.exports = openBrowser
