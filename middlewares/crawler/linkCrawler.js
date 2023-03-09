const {
  getAllLinksInfo,
  getLinkInfo,
  updateLinkTime,
} = require('../../controllers/linkController');
const { executeAsyncTask, taskInfo } = require('../../utils');

// const {
//   findOneContentLink,
//   addContentLink,
// } = require('../controllers/LinkListController');
// const { updateTaskInfo } = require('../controllers/taskController/controller');
let info;

function formatLink(Link) {
  const { _id, link, defaultListSelector } = Link;
  const selector = link.selector || defaultListSelector;
  return { website: _id, url: link.url, selector };
}

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

async function getURL({ url, selector, website }, page, index) {
  /** 获取新闻链接 [] */
  console.log(`任务${index}开始执行`);
  let info = {
    success: 0,
    failed: 0,
    count: 0,
  };
  const linkList = await getNewsList(url, selector, page);
  if (linkList.state) {
    /** 将收集到的链接放入数据库 */
    info.count += linkList.links.length;
    const success = await saveURL(linkList.links, website);
    info.success += success;
    await updateLinkTime(url);
    return info;
  } else {
    info.failed++;
    return info;
  }
}

async function saveURL(linkList, website) {
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

/**
 * 开始执行获取新闻链接任务
 * @returns
 */
async function linksStart(_id) {
  // 获取任务
  const taskQueue = await createLinkTask();
  if (taskQueue.length > 0) {
    info = taskInfo();
    // 任务开始执行事件
    let time = new Date();
    // 开始执行异步任务
    console.log('开始执行获取新闻链接任务');
    await executeAsyncTask(taskList, getLink);

    // 计算任务耗时
    info.elapsedTime = new Date() - time;
    // 把任务状态改成已完成
    info.state = 1;
    // 更新任务状态
    await updateTaskInfo(_id, info);
    console.log(info);

    return info;
  } else return false;
}

module.exports = { linksStart, createAllLinkTask, getURL };
