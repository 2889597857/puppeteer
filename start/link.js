const getNewsList = require('../puppeteer/getNewsList')
const { getAllLinks } = require('../controllers/linkController')
const { getLinkSelector } = require('../controllers/selectorController')
const {
  findOneContentLink,
  addContentLink
} = require('../controllers/LinkListController')
const { executeAsyncTask } = require('../utils')

let time = 0
const taskInfo = {
  taskTime: 0,
  taskLength: 0,
  successTask: 0,
  failedTask: 0,
  successLink: 0
}
async function getLink({ url, selector, website },page) {
  const linkList = await getNewsList(url, selector,page)
  if (linkList.state) {
    const success = await saveLink(linkList.links, website)
    taskInfo.successLink += success
    taskInfo.successTask++
    return
  } else {
    taskInfo.failedTask++
    return
  }
}

async function saveLink(linkList, website) {
  const finallyList = []
  for await (const link of linkList) {
    const contentLink = await findOneContentLink(link)
    if (!contentLink) {
      finallyList.push({ url: link, website })
    }
  }
  if (finallyList.length > 0) {
    // console.log(finallyList);
    const success = await addContentLink(finallyList)
    return success.length
  } else {
    return 0
  }
}

async function getLinkTask() {
  const links = await getAllLinks()
  const taskList = []
  if (links.length > 0) {
    for await (const link of links) {
      const { url, website } = link
      const { selector } = await getLinkSelector(website)
      if (selector) {
        taskList.push({ url, selector, website })
      }
    }
  }
  return taskList
}

async function start() {
  time = new Date()
  // 获取任务
  const taskList = await getLinkTask()
  // 任务数量
  taskInfo.taskLength = taskList.length
  // 开始执行异步任务
  executeAsyncTask(taskList, getLink).then(() => {
    // 计算任务执行时间
    taskInfo.time = new Date() - time
  })
  // 返回任务列表
  return taskList
}
module.exports = { start }
