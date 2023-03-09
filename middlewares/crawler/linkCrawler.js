const {
  getAllLinks,
  updateLinkTime,
} = require('../../controllers/linkController');
const { executeAsyncTask, taskInfo } = require('../../utils');

// const {
//   findOneContentLink,
//   addContentLink,
// } = require('../controllers/LinkListController');
// const { updateTaskInfo } = require('../controllers/taskController/controller');
let info;

async function createLinkTask() {
  // 获取新闻列表页面的URL
  const links = await getAllLinks();
  // 任务队列
  const taskQueue = [];
  if (links) {
    links.forEach((site) => {
      const { link, defaultListSelector, _id } = site;
      const selector = link.selector || defaultListSelector;
      taskQueue.push({ website: _id, url: link.url, selector });
    });
  }
  return taskQueue;
}

// time: 0,
// count: 0,
// success: 0,
// failed: 0,
// let info;

async function getLink({ url, selector, website }, page, index) {
  /** 获取新闻链接 [] */
  console.log(`任务${index}开始执行`);
  const linkList = await getNewsList(url, selector, page);
  if (linkList.state) {
    /** 将收集到的链接放入数据库 */
    info.count += linkList.links.length;
    const success = await saveLink(linkList.links, website);
    info.success += success;
    return;
  } else {
    info.failed++;
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

module.exports = { linksStart, createLinkTask, getLink };
