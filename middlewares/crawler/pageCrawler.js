const getNewsInfo = require('../../puppeteer/getNewsInfo');
const {
  updateLinkState,
  findAllContentLink,
} = require('../../controllers/urlListController');
const { getPageSelector } = require('../../controllers/websiteController');
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
    selectors = await getPageSelector(website);
  }
  if (selectors) {
    // 获取页面内容
    const pageContent = await getNewsInfo(url, selectors, page);
    if (pageContent.state) {
      // 储存新闻
      const result = await saveContent(pageContent.content, url);
      if (result) return true;
      else return false;
    } else {
      // 获取新闻内容失败
      // 更新链接状态
      info.failed++;
      await updateLinkState(url, pageContent.code);
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
  try {
    const result = await createNews(content);
    if (result.length > 0) {
      // 更新链接状态
      await updateLinkState(url, 1);
      info.success++;
      return true;
    }
  } catch (error) {
    await updateLinkState(url, 2);
    info.failed++;
    return false;
  }
}

// async function contentStart(_id) {
//   info = taskInfo();
//   const taskList = await createContentTask();
//   if (taskList.length > 0) {
//     info = taskInfo();
//     info.count = taskList.length;

//     let time = new Date();

//     console.log('开始执行获取新闻内容任务');

//     await executeAsyncTask(taskList, getContent);

//     // 计算任务执行时间
//     info.elapsedTime = new Date() - time;
//     info.state = 1;

//     await updateTaskInfo(_id, info);
//     console.log(info);

//     return info;
//   } else return false;
// }

module.exports = { createContentTask, getContent };
