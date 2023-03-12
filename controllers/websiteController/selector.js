const WebsiteModel = require('../../models/websiteModel');
const { getTopURL, verifyID, message } = require('../../utils');
const { siteOrSelector } = require('./controller');

async function getAllPageSelector(req, res) {
  const websiteInfo = await siteOrSelector(true);
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
async function getPageSelectorByID(_id) {
  const selector = await WebsiteModel.findById(_id, {
    pageSelector: 1,
  });
  if (selector.pageSelector) return selector;
  else return false;
}
async function getPageSelectorByURL(url) {
  const selector = await WebsiteModel.findOne(
    { url },
    {
      pageSelector: 1,
    }
  );
  if (selector.pageSelector) return selector;
  else return false;
}
async function getLinkSelectorByID(_id) {
  const selector = await WebsiteModel.findOne(
    { 'newsLinks._id ': _id },
    {
      defaultListSelector: 1,
      newsLinks: {
        $elemMatch: {
          ' _id': _id,
        },
      },
    }
  );
  if (selector) {
    const { defaultListSelector, newsLinks } = selector;
    return {
      url: newsLinks[0].url,
      selector: newsLinks[0].selector ?? defaultListSelector,
    };
  } else return false;
}
async function addSelector(req, res) {
  const {} = req.query;
}
async function addLinkSelector(req, res) {}
async function addPageSelector(req, res) {
  const { _id, selector } = req.body;
  try {
    if (!verifyID(_id)) throw new Error('_id is wrong');
    const data = await WebsiteModel.findByIdAndUpdate(
      _id,
      {
        $push: { pageSelector: { ...selector } },
      },
      { new: true }
    );
    if (data) {
      res.json({ code: 200, data: data._id });
    } else throw new Error('添加失败');
  } catch (error) {
    res.json({ code: 201, error: error.message });
  }
}

module.exports = {
  addSelector,
  addLinkSelector,
  addPageSelector,
  getAllPageSelector,
  getPageSelectorByID,
  getPageSelectorByURL,
  getLinkSelectorByID,
};
