const jieba = require('@node-rs/jieba')
const { getNewsInfo } = require('../puppeteer/getNewsInfo')
const LinkListModel = require('../models/linkListModel')
const {
  removeContentLink,
  updateLinkState,
  findAllContentLink
} = require('../controllers/LinkListController')
const { addContent } = require('../controllers/contentController')
const { getContentSelect } = require('../controllers/selectorController')
const { executeAsyncTask } = require('../utils')

async function createTasks () {
  const linkList = await findAllContentLink()
  if (linkList) {
    const taskList = []
    for (const link of linkList) {
      const { url, website } = link
      taskList.push({ url, website })
    }
    return taskList
  }
}
let count = 0
async function getContent ({ url, website }, cnt) {
  console.log(`任务${cnt}开始`)
  let selector = null
  if (website && url) {
    selector = await getContentSelect(website)
  }
  if (selector) {
    const { titleSelect, timeSelector, contentSelector } = selector
    const pageContent = await getNewsInfo(url, {
      titleSelect,
      timeSelector,
      contentSelector
    })
    console.log(`任务${cnt}进行中`)
    console.log(pageContent)
    if (pageContent) {
      console.log(`任务${cnt}进行中`)
      const { content } = pageContent
      const topN = 20
      pageContent.segmentation = jieba.extract(content.join(''), topN)
      pageContent.url = url
      const result = await addContent(pageContent)
      if (result) {
        console.log(count++)
        await updateLinkState(url, 1)
        console.log(`任务${cnt}结束`)
        return true
      } else return false
    } else {
      await updateLinkState(url, 2)
      console.log(`任务${cnt}结束`)
      return false
    }
  } else {
    console.log(`任务${cnt}结束`)
    return false
  }
}

async function start () {
  const taskList = await createTasks()
  const linkList = await executeAsyncTask(taskList, getContent)
}
module.exports = { start }
