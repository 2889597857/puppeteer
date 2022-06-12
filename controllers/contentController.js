const ContentModel = require('../models/contentModel')
const LinkListModel = require('../models/linkListModel')
const { getNewsInfo } = require('../puppeteer/getNewsInfo')
const jieba = require('@node-rs/jieba')
const { getContentSelect } = require('../controllers/selectorController')

async function addContent (pageContent) {
  return ContentModel.insertMany([pageContent])
}
async function getContent () {
  let a2 = await LinkListModel.find({ state: 0 })
  const { url, website, _id } = a2[41]
  if (website && url) {
    const selector = await getContentSelect(website)
    if (selector) {
      const { titleSelect, timeSelector, contentSelector } = selector
      const pageContent = await getNewsInfo(url, {
        titleSelect,
        timeSelector,
        contentSelector
      })
      const { content } = pageContent
      const topN = 20
      pageContent.segmentation = jieba.extract(content.join(''), topN)
      pageContent.url = _id.toHexString()
      console.log(pageContent)
      if (pageContent) {
        addContent(pageContent)
      }
    }
  }
}

module.exports = {
  addContent
}
