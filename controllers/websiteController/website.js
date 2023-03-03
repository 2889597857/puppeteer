const WebsiteModel = require('../../models/websiteModel');
const { getTopURL, verifyID, urlRegExp, message } = require('../../utils');
const { siteOrSelector, findWebsiteNames } = require('./controller');

/**
 * 获取新闻站点
 * @param {*} req
 * @param {*} res
 */
async function getWebsite(req, res) {
  const websiteInfo = await siteOrSelector();
  if (websiteInfo.success) {
    res.json({
      code: 200,
      data: websiteInfo.websiteInfo,
    });
  } else {
    res.json({
      code: 201,
      data: [],
    });
  }
}

/**
 * 获取所有网站名称
 * @param {*} req
 * @param {*} res
 */
async function findWebsiteAllName(req, res) {
  const siteName = await findWebsiteNames();
  res.json({
    ...siteName,
  });
}
/**
 * 模糊查询网站名称
 * @param {*} req
 * @param {*} res
 */
async function findWebsiteName(req, res) {
  const name = req.query.name;
  if (name) {
    const siteName = await findWebsiteNames(false, name);
    res.json({
      ...siteName,
    });
  } else
    res.json({
      code: 202,
      message: message['202'],
    });
}
/**
 * 通过Url查询网站名称
 * @param {*} req
 * @param {*} res
 */
async function findWebsiteNameByUrl(req, res) {
  const url = getTopURL(req.query.url);
  if (url) {
    const name = await WebsiteModel.getNameByURL(url);
    if (name)
      res.json({
        code: 200,
        data: {
          success: true,
          ...name,
        },
      });
  }
}
/**
 * 查询网站Link页面的 URL
 * @param {*} req
 * @param {*} res
 */
async function findWebsiteLink(req, res) {
  const url = req.query.url;
  try {
    if (!urlRegExp(url)) throw new Error('url must be a valid');
    const site = await WebsiteModel.findOne(
      { 'newsLinks.url': url },
      {
        name: 1,
        newsLinks: {
          $elemMatch: {
            url,
          },
        },
      }
    );
    res.json({
      data: site,
    });
  } catch (error) {
    res.json({
      code: 201,
      message: error.message,
    });
  }
}

async function addWebsite(req, res) {
  const { _id, name, url, selector } = req.body;
  if (_id && verifyID(_id)) {
    let updateSiteLink;
    try {
      updateSiteLink = await WebsiteModel.findByIdAndUpdate(
        _id,
        {
          $push: { newsLinks: { url } },
        },
        { new: true }
      );
    } catch (error) {
      updateSiteLink = error.message;
    }
    res.json({
      code: 200,
      data: updateSiteLink,
    });
  } else if (name) {
    let addSite;
    try {
      addSite = await WebsiteModel.insertMany([
        {
          name,
          url: getTopURL(url),
          defaultListSelector: selector,
          newsLinks: [{ url }],
        },
      ]);
    } catch (error) {
      addSite = error.message;
    }
    res.json({
      code: 200,
      data: addSite,
    });
  } else {
    res.json({
      code: 201,
      data: '错误',
    });
  }
  // updateOne( { _id, newsList: { $elemMatch: { _id: replyId } } }, { $push: { 'newsList.$.favour': favourMurmur } })
}

async function findWebsite(req, res) {
  const { _id, name, url, selector } = req.body;
  if (_id && verifyID(_id)) {
  }
  res.json({
    code: 200,
    msg: 'c ',
  });
}

module.exports = Website = {
  getWebsite,
  findWebsiteName,
  findWebsiteAllName,
  findWebsiteNameByUrl,
  findWebsiteLink,
  findWebsite,
  addWebsite,
};
