const { caches, openBrowser, getTopURL } = require('../utils');
const { getContentSelect } = require('../controllers/selectorController');
const { findWebsite } = require('../controllers/websiteController');
const { getNewsInfo } = require('../puppeteer/getNewsInfo');
const {
  findOneContentLink,
  addContentLink,
} = require('../controllers/LinkListController');

const ContentModel = require('../models/contentModel');

async function getNewsContent(url) {
  let content = await ContentModel.findOne({ url });
  if (content) return content;

  let web = await findWebsite(getTopURL(url));
  if (web && web._id) {
    let selector = await getContentSelect(web._id);
    if (selector) {
      let page = await openBrowser();
      const pageContent = await getNewsInfo(url, selector, page);
      caches[0].close();
      if (pageContent) {
        const a = await findOneContentLink(url);
        if (a == null)
          addContentLink([{ url, state: 1, website: web._id.toHexString() }]);
        let news = await ContentModel.insertMany([pageContent]);
        return news[0];
      } else {
        return false;
      }
    }
  } else {
  }
}
module.exports = { getNewsContent };
