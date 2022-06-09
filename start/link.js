const getNewsList = require('../puppeteer/getNewsList')
const { getAllLinks } = require('../controllers/linkController')
const { getLinkSelector } = require('../controllers/selectorController')
const { findContentLink, addContentLink } = require('../controllers/LinkListController')
const { executeAsyncTask } = require('../utils')

const taskInfo = {
  taskTime: 0,
  taskLength: 0,
  successTask: 0,
  failedTask: 0,
  successLink: 0,
}

async function getLink({ url, selector, website }) {
  const linkList = await getNewsList(url, selector)
  if (linkList) {
    taskInfo.successLink++
    return await saveLink(linkList, website)
  } else {
    return 0
  }
}

async function saveLink(linkList, website) {
  const finallyList = []
  for await (const link of linkList) {
    const contentLink = await findContentLink(link)
    if (!contentLink) {
      finallyList.push({ url: link, website })
    }
  }
  if (finallyList.length > 0) {
    success += finallyList.length
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
  const taskList = await getLinkTask()
  const linkList = await executeAsyncTask(taskList, getLink)
  console.log(linkList);
}


// async function AsyncTasks(AsyncTasks, fn) {
//   const taskQueue = [...AsyncTasks]
//   return await Promise.all(new Array(taskQueue.length).fill(null).map(async () => {
//     let curr
//     while (curr = taskQueue.pop()) {
//       return await fn(curr)
//     }
//   }))
// }

start()
