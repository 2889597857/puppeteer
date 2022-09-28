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
