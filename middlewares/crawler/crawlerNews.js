const { openBrowser, getTopURL } = require('../../puppeteer/browser');
const { getPageSelectorByURL } = require('../../controllers/websiteController');
const getNewsInfo = require('../../puppeteer/NewsList/getNewsInfo');
const {
  findOneContentLink,
  addContentLink,
} = require('../../controllers/urlListController');

const ContentModel = require('../../models/contentModel');

async function crawlerNewsContent(url) {
  try {
    // url 是否被爬取过
    const content = await ContentModel.findOne({ url });
    // 爬取过，直接返回内容
    if (content) return content;

    const selectors = await getPageSelectorByURL(getTopURL(url));
    if (selectors) {
      // 打开浏览器
      const page = await openBrowser(false);
      // 开始爬取新闻
      const news = await getNewsInfo(url, selectors.pageSelector, page);
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
