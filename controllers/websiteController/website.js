const WebsiteModel = require('../../models/websiteModel');
const { getTopURL, verifyID, message } = require('../../utils');

async function getWebsite(req, res) {
  // WebsiteModel.find({},{})
  res.json({
    code: 200,
    msg: 'c ',
  });
}

async function findWebsiteNames(all = true, name) {
  const option = all ? {} : { name: { $regex: name } };
  const site = await WebsiteModel.find(option, { _id: 1, name: 1 });
  return site.length > 0
    ? {
        code: 200,
        data: {
          success: true,
          name: site,
        },
      }
    : {
        code: 200,
        data: {
          success: false,
        },
      };
}
async function findWebsiteAllName(req, res) {
  const siteName = await findWebsiteNames();
  res.json({
    date: siteName,
  });
}
async function findWebsiteName(req, res) {
  const name = req.query.name;
  if (name) {
    const siteName = await findWebsiteNames(false, name);
    res.json({
      date: siteName,
    });
  } else
    res.json({
      code: 202,
      message: message['202'],
    });
}

async function findWebsiteUrl(req, res) {
  const url = req.query.url;
  if (!url)
    res.json({
      code: 201,
      message: '参数错误',
    });
  else {
    const site = await WebsiteModel.find(
      { newsLinks: { $elemMatch: { url } } },
      { _id: 1, newsLinks: 1 }
    );

    if (site && site.length > 0)
      res.json({
        date: {
          success: true,
          _id: site[0].newsLinks[0]._id,
        },
      });
    else
      res.json({
        code: 200,
        date: {
          site: false,
        },
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
      date: updateSiteLink,
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
      date: addSite,
    });
  } else {
    res.json({
      code: 201,
      date: '错误',
    });
  }
  // updateOne( { _id, newsList: { $elemMatch: { _id: replyId } } }, { $push: { 'newsList.$.favour': favourMurmur } })
}
async function addSelector(res, req, next) {}
// async function addLink(req, res) {
// }

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
  findWebsiteUrl,
  findWebsite,
  addWebsite,
  addSelector,
};
