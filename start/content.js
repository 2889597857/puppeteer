const jieba = require('@node-rs/jieba');
const { getNewsInfo } = require('../puppeteer/getNewsInfo');
const {
  removeContentLink,
  updateLinkState,
  findAllContentLink,
} = require('../controllers/LinkListController');
const { addContent } = require('../controllers/contentController');
const { getContentSelect } = require('../controllers/selectorController');
const { executeAsyncTask } = require('../utils');

async function createTasks() {
  // 获取链接（每次获取 100 条）
  const linkList = await findAllContentLink();
  if (linkList) {
    const taskList = [];
    for (const link of linkList) {
      const { url, website } = link;
      taskList.push({ url, website });
    }
    return taskList;
  }
}
async function getContent({ url, website }, page) {
  let selector = null;
  if (website && url) {
    // 获取选择器
    selector = await getContentSelect(website);
  }
  if (selector) {
    const { titleSelect, timeSelector, contentSelector } = selector;
    // 获取页面内容
    const pageContent = await getNewsInfo(
      url,
      {
        titleSelect,
        timeSelector,
        contentSelector,
      },
      page
    );
    if (pageContent) {
      const { content } = pageContent;
      const topN = 20;
      // 获取新闻关键词
      pageContent.segmentation = jieba.extract(content.join(''), topN);
      pageContent.url = url;
      // 储存新闻
      const result = await addContent(pageContent);
      if (result) {
        // 更新链接状态
        await updateLinkState(url, 1);
        return true;
      } else return false;
    } else {
      // 获取新闻内容失败
      await updateLinkState(url, 2);
      return false;
    }
  } else {
    // 获取选择器失败
    return false;
  }
}

async function start() {
  const taskList = await createTasks();
  if (taskList.length > 0) {
    executeAsyncTask(taskList, getContent);
    return taskList;
  }
}
module.exports = { start };
