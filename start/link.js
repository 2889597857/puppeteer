const getNewsList = require('../puppeteer/getNewsList');
const { getAllLinks } = require('../controllers/linkController');
const { getLinkSelector } = require('../controllers/selectorController');
const {
  findOneContentLink,
  addContentLink,
} = require('../controllers/LinkListController');
const { executeAsyncTask, taskInfo } = require('../utils');
const { updateTaskInfo } = require('../controllers/taskController');

// time: 0,
// count: 0,
// success: 0,
// failed: 0,

let info;

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

async function createTasks() {
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
async function start(_id) {
  info = taskInfo();
  let time = new Date();
  // 获取任务
  const taskList = await createTasks();

  // 开始执行异步任务
  await executeAsyncTask(taskList, getLink);

  // 计算任务执行时间
  info.elapsedTime = new Date() - time;
  info.state = 1;
  console.log(info);
  return await updateTaskInfo(_id, info);
  // 返回任务列表
}

module.exports = { start, createTasks };
