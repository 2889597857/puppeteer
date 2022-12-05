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
  const website = await WebsiteModel.findOne({ url: topURL });
  if (website && website._id) {
    const res = await LinkSelectorModel.insertMany([
      { selector, website: website._id.toHexString() },
    ]);
    return res;
  }
}

module.exports = {
  getLinkSelector,
  addLinkSelect,
};

// addLinkSelect({
//   url: 'http://www.cnr.cn/ah/news/',
//   selector: '#main > div.articleList > div > a',
// }).then((res) => console.log(res));
