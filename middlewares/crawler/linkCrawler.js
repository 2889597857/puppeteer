const {
  getAllLinksInfo,
  getLinkInfo,
  updateLinkTime,
} = require('../../controllers/linkController');

const {
  findOneContentLink,
  addContentLink,
} = require('../../controllers/urlListController');

const getNewsList = require('../../puppeteer/getNewsList');

function formatLink(Link) {
  const { _id, link, defaultListSelector } = Link;
  const selector = link.selector || defaultListSelector;
  return { website: _id, url: link.url, selector };
}
/**
 * 创建获取链接任务
 * @returns
 */
async function createAllLinkTask() {
  // 获取新闻列表页面的URL
  const links = await getAllLinksInfo();
  // 任务队列
  const taskQueue = [];
  if (links) {
    links.forEach((Link) => taskQueue.push(formatLink(Link)));
    console.log(taskQueue);
    return taskQueue;
  } else return false;
}
/**
 * 创建指定Link任务
 * @returns
 */
async function createLinkTask(_id) {
  // 获取新闻列表页面的URL
  const link = await getLinkInfo(_id);
  // 任务队列
  const taskQueue = [];
  if (link) {
    taskQueue.push(formatLink(link));
    console.log(taskQueue);
    return taskQueue;
  } else return false;
}

/**
 * 获取新闻链接
 */
async function getURL({ url, selector, website }, page, index) {
  console.log(`任务${index}开始执行`);
  const linkList = await getNewsList(url, selector, page);
  if (linkList.state) {
    /** 将收集到的链接放入数据库 */
    await saveURL(linkList.links, website);
    // 更新采集时间
    await updateLinkTime(url);
    return true;
  } else {
    return false;
  }
}
/**
 * 存新闻链接
 */
async function saveURL(linkList, website) {
  for await (const link of linkList) {
    // 链接是否存在.不存在返回 null
    const isExistenceLink = await findOneContentLink(link);
    // 不存在 存入数据库
    if (isExistenceLink == null) await addContentLink([{ url: link, website }]);
  }
}

module.exports = { createAllLinkTask, createLinkTask, getURL };
