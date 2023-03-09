const WebsiteModel = require('../../models/websiteModel');

async function getAllLinks() {
  try {
    const Links = await WebsiteModel.aggregate([
      { $unwind: '$newsLinks' },
      {
        $match: {
          'newsLinks.state': true,
        },
      },
      {
        $project: {
          defaultListSelector: 1,
          link: {
            url: '$newsLinks.url',
            selector: '$newsLinks.selector',
          },
        },
      },
    ]);
    if (Links && Links.length > 0) return Links;
    else throw new Error();
  } catch (error) {
    console.log(error.message);
    return false;
  }
}

async function updateLinkTime(url) {
  try {
    const data = await WebsiteModel.updateOne(
      { newsLinks: { $elemMatch: { url } } },
      { $set: { 'newsLinks.$.lastTime': new Date() } }
    );
    if (data.acknowledged) return true;
    else throw new Error();
  } catch (error) {
    console.log(error.message);
    return false;
  }
}

module.exports = {
  getAllLinks,
  updateLinkTime,
};

// // 添加获取新闻列表页面的URL
// async function addLink(url) {
//   const link = await getLink(url);
//   if (link !== null)
//     return Promise.resolve({
//       msg: 'URL已存在',
//       data: link,
//     });

//   const topURL = getTopURL(url);
//   const website = await WebsiteModel.findOne({ url: topURL });
//   if (website !== null) {
//     const { _id } = website;
//     const data = await LinkModel.insertMany([
//       { url, website: _id.toHexString() },
//     ]);
//     return {
//       msg: '添加成功',
//       data,
//     };
//   } else {
//     return {
//       msg: '添加失败',
//       data: url,
//     };
//   }
// }
// /** 查询URL是否存在 */
// async function getLink(url) {
//   return await LinkModel.findOne({ url });
// }
// /**
//  * @return 所有新闻列表网页的url
//  */
// async function getAllLinks() {
//   return await LinkModel.find({ isCollected: 1 });
// }

// module.exports = {
//   addLink,
//   getLink,
//   getAllLinks,
// };

// addLink('http://www.cnr.cn/ah/news').then((res) => console.log(res));
// addLink('http://www.ahnews.com.cn/yaowen1/pc/lay/node_496.html').then((res) => console.log(res));
