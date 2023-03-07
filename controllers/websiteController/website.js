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
 * 查询网站Link页面的URL是否存在
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
        defaultListSelector: 1,
      }
    );
    res.json({
      code: 200,
      data: site,
    });
  } catch (error) {
    res.json({
      code: 201,
      message: error.message,
    });
  }
}
/**
 * 根据_id查询站点信息
 * @param {*} req
 * @param {*} res
 */

async function findSiteInfoByID(req, res) {
  const id = req.query._id;
  try {
    if (!verifyID(id)) throw new Error(`Could not find ${id}`);
    const data = await WebsiteModel.findById(id, {
      name: 1,
      newsLinks: 1,
      defaultListSelector: 1,
      pageSelector: 1,
    });
    res.json({
      code: 200,
      data,
    });
  } catch (err) {
    res.json({
      code: 201,
      message: err.message,
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
}

async function addSiteLink(req, res) {
  const { _id, url, selector } = req.body;
  try {
    let updateSiteLink;
    if (_id && verifyID(_id)) {
      updateSiteLink = await WebsiteModel.findByIdAndUpdate(
        _id,
        {
          $push: { newsLinks: { url, selector } },
        },
        { new: true }
      );
    } else throw new Error('_id is wrong');
    res.json({
      code: 200,
      data: updateSiteLink,
    });
  } catch (error) {
    res.json({
      code: 200,
      message: error.message,
    });
  }
}

module.exports = Website = {
  getWebsite,
  findWebsiteName,
  findWebsiteAllName,
  findWebsiteNameByUrl,
  findWebsiteLink,
  findSiteInfoByID,
  addWebsite,
  addSiteLink,
};
