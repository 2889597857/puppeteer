const { getTopURL } = require('../../puppeteer/browser');
const { getPageSelectorByURL } = require('../../controllers/websiteController');
const getNewsList = require('../../puppeteer/NewsList');
const openBrowser = require('../../puppeteer/browser');

const {
  findOneContentLink,
  addContentLink,
} = require('../../controllers/urlListController');

const ContentModel = require('../../models/contentModel');

async function crawlerNewsContent(url) {
  try {
    const selectors = await getPageSelectorByURL(getTopURL(url));
    if (selectors) {
      // 打开浏览器
      const page = await openBrowser(false);
      // 开始爬取新闻
      const news = await getNewsList(url, selectors.pageSelector, page);
      // 爬取结束，关闭爬虫（浏览器）
      page.browser().close();

      // urlList 表是否有 url
      const isExecuting = await findOneContentLink(url);
      if (news.state) {
        if (isExecuting == null)
          // 存 URL
          addContentLink({ url, state: 1, website: selectors._id });
        // 存新闻
        let res = await ContentModel.insertMany([news.content]);
        return res[0];
      } else {
        if (isExecuting)
          addContentLink([{ url, state: 2, website: selectors._id }]);
        return false;
      }
    }
  } catch (error) {
    console.log(error.message);
    return false;
  }
}
module.exports = crawlerNewsContent;
