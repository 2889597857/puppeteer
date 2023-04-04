const getNewsInfo = require('../../puppeteer/NewsInfo');
const {
  updateLinkState,
  findAllContentLink,
} = require('../../controllers/urlListController');
const { getPageSelectorByID } = require('../../controllers/websiteController');
const { createNews } = require('../../controllers/newsController');

async function createContentTask() {
  const linkList = await findAllContentLink();
  if (linkList.length !== 0) {
    const taskQueue = [];
    for (const link of linkList) {
      const { url, website } = link;
      taskQueue.push({ url, website });
    }
    return taskQueue;
  } else return false;
}

async function getContent({ url, website }, page, index) {
  console.log(`任务${index + 1}开始执行`);
  let selectors = null;
  if (website && url) {
    // 获取选择器
    selectors = await getPageSelectorByID(website);
  }
  if (selectors) {
    // 获取页面内容
    const pageContent = await getNewsInfo(url, selectors.pageSelector, page);
    if (pageContent.state) {
      // 储存新闻
      pageContent.content.website = website;
      const result = await saveContent(pageContent.content, url);
      if (result)
        return {
          state: true,
          result: 1,
        };
      else
        return {
          state: false,
        };
    } else {
      // 获取新闻内容失败
      // 更新链接状态
      await updateLinkState(url, pageContent.code, pageContent.message);
      return {
        state: false,
      };
    }
  } else {
    // 获取选择器失败
    return {
      state: false,
    };
  }
}

async function saveContent(content, url) {
  // 储存新闻
  try {
    const result = await createNews(content);
    if (result.length > 0) {
      // 更新链接状态
      await updateLinkState(url, 1);
      return true;
    }
  } catch (error) {
    await updateLinkState(url, 2);
    return false;
  }
}

module.exports = { createContentTask, getContent };
