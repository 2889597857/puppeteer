const WebsiteModel = require('../../models/websiteModel');
/**
 * 查询网站名称
 * @param {boolean} all
 * @param {string} name
 */
async function findWebsiteNames(all = true, name) {
  const option = all ? {} : { name: { $regex: name } };
  const site = await WebsiteModel.find(option, { _id: 1, name: 1 });
  return site.length > 0
    ? {
        code: 200,
        data: site,
      }
    : {
        code: 200,
        data: [],
      };
}
async function siteOrSelector(selector = false) {
  try {
    const websiteInfo = await WebsiteModel.aggregate([
      {
        $project: {
          _id: 1,
          name: 1,
          defaultListSelector:1,
          list: selector ? '$pageSelector' : '$newsLinks',
        },
      },
    ]);
    if (websiteInfo && websiteInfo.length > 0) {
      return {
        success: true,
        websiteInfo,
      };
    } else {
      throw new Error('查询失败');
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}
module.exports = {
  siteOrSelector,
  findWebsiteNames,
};
