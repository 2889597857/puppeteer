const LinkSelectorModel = require('../../models/linkSelectorModel');
const WebsiteModel = require('../../models/websiteModel');
const { getTopURL } = require('../../utils');

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

module.exports = {
  getLinkSelector,
  addLinkSelect,
};
