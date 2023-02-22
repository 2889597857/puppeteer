const WebsiteModel = require('../../models/websiteModel');

async function getWebsite(){
  WebsiteModel.find({},{})
}

async function addWebsite(req, res) {
  const { _id, state } = req.body;

  let { name, url } = website;
  url = getTopURL(url);
  const existsWebsite = findWebsite(url);
  const res = await WebsiteModel.insertMany([{ name, url }]);
  return res;

  async (req, res) => {
    // contentStart()
    res.json({
      code: 200,
      msg: 'c ',
    });
  };
  updateOne( { _id, newsList: { $elemMatch: { _id: replyId } } }, { $push: { 'newsList.$.favour': favourMurmur } })
}
async function addLink(req, res) {
}


async function findWebsite(url) {
  return await WebsiteModel.get(url);
}

module.exports = Website = {
  addWebsite,
  findWebsite,
  getWebsite
};
