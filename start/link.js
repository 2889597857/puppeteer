const getNewsList = require('../puppeteer/getNewsList')
const { getLinks } = require('../controllers/linkController')

async function getLinkSelect () {}

async function link (url, selector) {
  const linkList = await getNewsList(url, selector)
}
async function saveLink () {}
async function startGetLinkTask () {
  const links = await getLinks()
  const taskNumber = links.length
}
startGetLinkTask()
