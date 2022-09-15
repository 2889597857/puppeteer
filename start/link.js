const getNewsList = require('../puppeteer/getNewsList');
const { getAllLinks } = require('../controllers/linkController');
const { getLinkSelector } = require('../controllers/selectorController');
const {
  findOneContentLink,
  addContentLink,
} = require('../controllers/LinkListController');
const { executeAsyncTask } = require('../utils');

let time = 0;
const taskInfo = {
  taskTime: 0,
  taskLength: 0,
  successTask: 0,
  failedTask: 0,
  successLink: 0,
};

async function getLink({ url, selector, website }, page) {
  /** 获取新闻链接 [] */
  const linkList = await getNewsList(url, selector, page);
  if (linkList.state) {
    /** 将收集到的链接放入数据库 */
    const success = await saveLink(linkList.links, website);
    taskInfo.successLink += success;
    taskInfo.successTask++;
    return;
  } else {
    taskInfo.failedTask++;
    return;
  }
}

async function saveLink(linkList, website) {
  let count = 0;
  for await (const link of linkList) {
    try {
      // 链接是否存在.不存在返回 null
      const isExistenceLink = await findOneContentLink(link);
      if (isExistenceLink == null) {
        const success = await addContentLink([{ url: link, website }]);
        if (success) count++;
      }
    } catch (error) {
      continue;
    }
  }
  return count;
}

async function getLinkTask() {
  // 获取新闻列表页面的URL
  const links = await getAllLinks();
  // 任务队列
  const taskList = [];
  if (links.length > 0) {
    for await (const link of links) {
      const { url, website } = link;
      // 获取新闻列表页面的新闻链接选择器
      const { selector } = await getLinkSelector(website);
      // 获取新闻链接任务加入任务队列
      if (selector) {
        taskList.push({ url, selector, website });
      }
    }
  }
  return taskList;
}
/**
 * 开始执行获取新闻链接任务
 * @returns
 */
async function start() {
  time = new Date();
  // 获取任务
  const taskList = await getLinkTask();
  // 任务数量
  taskInfo.taskLength = taskList.length;
  // 开始执行异步任务
  executeAsyncTask(taskList, getLink).then(() => {
    // 计算任务执行时间
    taskInfo.time = new Date() - time;
    return taskList;
  });
  // 返回任务列表
}
module.exports = { start };
