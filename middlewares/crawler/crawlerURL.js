const { getLinkSelectorByID } = require('../../controllers/websiteController');
const getNewsList = require('../../puppeteer/NewsList');
const { openBrowser } = require('../../puppeteer/browser');

async function crawlerNewsContent(_id) {
  try {
    const Link = await getLinkSelectorByID(_id);

    if (Link) {
      // 打开浏览器
      const page = await openBrowser();
      // 开始爬取链接
      const url = await getNewsList(Link.url, Link.selector, page);
      // 爬取结束，关闭爬虫（浏览器）
      page.browser().close();

      if (url.state) return url.links;
      else
        return {
          state: false,
          message: '获取链接失败',
        };
    } else {
      return {
        state: false,
        message: '未获取到站点信息',
      };
    }
  } catch (error) {
    return false;
  }
}
module.exports = crawlerNewsContent;
