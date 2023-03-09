const { openBrowser, getTopURL } = require('../utils');
const { getContentSelect } = require('../controllers/selectorController');
const { findWebsite } = require('../controllers/websiteController/index.js');
const { getNewsInfo } = require('../puppeteer/getNewsInfo');
const {
  findOneContentLink,
  addContentLink,
} = require('../controllers/urlListController');

const ContentModel = require('../models/contentModel');

async function getNewsContent(url) {
  // url 是否被爬取过
  const content = await ContentModel.findOne({ url });
  // 爬取过，直接返回内容
  if (content) return content;

  const web = await findWebsite(getTopURL(url));
  if (web && web._id) {
    let selector = await getContentSelect(web._id);
    if (selector) {
      let page = await openBrowser(false);
      // 开始爬取新闻
      const pageContent = await getNewsInfo(url, selector, page);
      // 爬取结束，关闭爬虫（浏览器）
      page.browser.close();

      const a = await findOneContentLink(url);
      if (pageContent) {
        if (a == null)
          addContentLink([{ url, state: 1, website: web._id.toHexString() }]);
        let news = await ContentModel.insertMany([pageContent]);
        return news[0];
      } else {
        addContentLink([{ url, state: 2, website: web._id.toHexString() }]);
        return false;
      }
    }
  } else {
  }
}
module.exports = { getNewsContent };
