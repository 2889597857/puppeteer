const { getNewsInfo } = require('../puppeteer/getNewsInfo');
const {
  updateLinkState,
  findAllContentLink,
} = require('../controllers/LinkListController');
const { createNews } = require('../controllers/newsController');
const { getContentSelect } = require('../controllers/selectorController');
const { executeAsyncTask, taskInfo } = require('../utils');
const { updateTaskInfo } = require('../controllers/taskController');

let info;

async function createTasks() {
  // 获取链接（每次获取 100 条）
  const linkList = await findAllContentLink();
  if (linkList.length !== 0) {
    const taskList = [];
    for (const link of linkList) {
      const { url, website } = link;
      taskList.push({ url, website });
    }
    info.count = taskList.length;
    return taskList;
  } else return [];
}
async function getContent({ url, website }, page, index) {
  console.log(`任务${index}开始执行`);
  let selector = null;
  if (website && url) {
    // 获取选择器
    selector = await getContentSelect(website);
  }
  if (selector) {
    // 获取页面内容
    const pageContent = await getNewsInfo(url, selector, page);
    if (pageContent) {
      // 储存新闻
      const result = await saveContent(pageContent, url);
      if (result) return true;
      else return false;
    } else {
      // 获取新闻内容失败
      // 更新链接状态
      await updateLinkState(url, 2);
      return false;
    }
  } else {
    info.failed++;
    // 获取选择器失败
    return false;
  }
}

async function saveContent(content, url) {
  // 储存新闻
  const result = await createNews(content);
  if (result.length > 0) {
    // 更新链接状态
    await updateLinkState(url, 1);
    info.success++;
    return true;
  } else {
    await updateLinkState(url, 2);
    info.failed++;
    return false;
  }
}

async function start(_id) {
  info = taskInfo();
  const taskList = await createTasks();
  if (taskList.length > 0) {
    let time = new Date();
    await executeAsyncTask(taskList, getContent);
    // 计算任务执行时间
    info.elapsedTime = new Date() - time;
    info.state = 1;
    console.log(info);
    return await updateTaskInfo(_id, info);
  }
}

module.exports = { start };
