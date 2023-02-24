const WebsiteModel = require('../../models/websiteModel');
const { getTopURL, verifyID } = require('../../utils');

async function getWebsite(req, res) {
  // WebsiteModel.find({},{})
  res.json({
    code: 200,
    msg: 'c ',
  });
}

async function findWebsiteName(req, res) {
  const name = req.query.name;
  if (!name)
    res.json({
      code: 200,
      date: {
        site: false,
      },
    });
  else {
    const site = await WebsiteModel.find(
      { name: { $regex: name } },
      { _id: 1, name: 1 }
    );
    if (site && site.length > 0)
      res.json({
        date: {
          site: true,
          name: site,
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
async function findWebsiteUrl(req, res) {
  const url = req.query.url;
  if (!url)
    res.json({
      code: 200,
      date: {
        site: false,
      },
    });
  else {
    const site = await WebsiteModel.find(
      { newsList: { $elemMatch: { url } } },
      { _id: 1, name: 1 }
    );
    if (site && site.length > 0)
      res.json({
        date: {
          url: true,
          name: site,
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

async function findWebsite(url) {
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
  findWebsiteUrl,
  findWebsite,
  addWebsite,
  addSelector,
};
