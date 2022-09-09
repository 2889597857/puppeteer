const LinkSelectorModel = require('../models/linkSelectorModel');
const ContentSelectorModel = require('../models/contentSelectorModel');
const WebsiteModel = require('../models/websiteModel');
const { getTopURL } = require('../utils');

/**
 * 获取链接选择器
 * @param {*} website
 * @returns
 */
async function getLinkSelector(website) {
  return await LinkSelectorModel.findOne({ website: website.toHexString() });
}
async function addLinkSelect({ url, selector }) {
  const topURL = getTopURL(url);
  const { _id } = await WebsiteModel.findOne({ url: topURL });
  const res = await LinkSelectorModel.insertMany([
    { selector, website: _id.toHexString() },
  ]);
  return res;
}
/**
 *  获取内容选择器
 * @param {*} website
 * @returns
 */
async function getContentSelect(website) {
  return await ContentSelectorModel.findOne({ website: website.toHexString() });
}
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
  getLinkSelector,
  addLinkSelect,
  getContentSelect,
  addContentSelect,
};

addLinkSelect({
  url: 'http://www.wuhunews.cn/yaowen/index.html',
  selector: '#ContentList li a',
}).then((res) => console.log(res));
