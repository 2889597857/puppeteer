const ContentSelectorModel = require('../../models/contentSelectorModel');
const WebsiteModel = require('../../models/websiteModel');
const { getTopURL } = require('../../utils');

/**
 *  获取内容选择器
 * @param {*} website
 * @returns
 */
async function getContentSelect(website) {
  return await ContentSelectorModel.findOne({ website: website.toHexString() });
}
/**
 * 添加选择器
 * @param {*} options
 * @returns
 */
async function addContentSelect(options) {
  const { url, titleSelect, contentSelector, timeSelector } = options;
  const topURL = getTopURL(url);
  const { _id } = await WebsiteModel.findOne({ url: topURL });
  const res = await ContentSelectorModel.insertMany([
    { titleSelect, contentSelector, timeSelector, website: _id.toHexString() },
  ]);
  return res;
}

module.exports = {
  getContentSelect,
  addContentSelect,
};

// addContentSelect({
//   url: '',
//   titleSelect: '',
//   contentSelector: '',
//   timeSelector: '',
// });
// addContentSelect({
//   url: 'http://www.cnr.cn/ah/news',
//   titleSelect: '#main > div.article > div.article-header > h1',
//   contentSelector:
//     '#main > div.article > div.article-body.clearfix > div.article-main > div.article-content',
//   timeSelector:
//     '#main > div.article > div.article-header > div > span:nth-child(1)',
// });
