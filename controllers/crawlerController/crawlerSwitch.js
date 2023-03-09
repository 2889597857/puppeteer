const WebsiteModel = require('../../models/websiteModel');
const { verifyID } = require('../../utils');
/**
 * 检查 req.query 格式
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function formatChangeParams(req, res, next) {
  const _id = req.query._id;
  const state = req.query.state;
  if ((verifyID(_id) && parseInt(state) == 0) || parseInt(state) == 1) {
    req.query.state = parseInt(state) == 0 ? false : true;
    next();
  } else {
    res.json({
      code: 201,
      message: '参数错误',
    });
  }
}

async function changeState(_id, state) {
  try {
    const data = await WebsiteModel.findById(_id);
    if (data) {
      data.state = state;
      data.newsLinks.forEach((link) => (link.state = state));
      await data.save();
      return {
        code: 200,
        data: true,
      };
    } else throw new Error("Couldn't find site");
  } catch (error) {
    return {
      code: 201,
      message: error.message,
    };
  }
}

async function changeAllState(req, res) {
  const state = parseInt(req.query.state);
  try {
    if (state == 0 || state == 1) {
      const sites = await WebsiteModel.find({}, { _id: 1 });
      for await (const site of sites) {
        await changeState(site._id, state);
      }
      res.json({
        code: 200,
        data: true,
      });
    } else throw new Error('参数错误');
  } catch (error) {
    res.json({
      code: 201,
      message: error.message,
    });
  }
}

async function changeSiteState(req, res) {
  const results = await changeState(req.query._id, req.query.state);
  res.json({
    ...results,
  });
}
/**
 * 关闭 LINK 爬虫
 * @param {*} req
 * @param {*} res
 */
async function changeLinkState(req, res) {
  const _id = req.query._id;
  const state = req.query.state;
  try {
    const data = await WebsiteModel.updateOne(
      { newsLinks: { $elemMatch: { _id } } },
      { $set: { 'newsLinks.$.state': state } }
    );
    if (data.acknowledged && data.modifiedCount) {
      res.json({
        code: 200,
        data: true,
      });
    }
  } catch (error) {
    res.json({
      code: 201,
      message: error.message,
    });
  }
}

module.exports = {
  changeAllState,
  changeSiteState,
  changeLinkState,
  formatChangeParams,
};
