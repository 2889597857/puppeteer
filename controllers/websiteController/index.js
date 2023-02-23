const WebsiteModel = require('../../models/websiteModel');

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

async function addWebsite(req, res) {
  console.log(req.body);
  const info = req.body
  res.json({
    code: 200,
    date: info,
  });
  // const { _id, state } = req.body;

  // let { name, url } = website;
  // url = getTopURL(url);
  // const existsWebsite = findWebsite(url);
  // const res = await WebsiteModel.insertMany([{ name, url }]);

  // updateOne( { _id, newsList: { $elemMatch: { _id: replyId } } }, { $push: { 'newsList.$.favour': favourMurmur } })
}
// async function addLink(req, res) {
// }

async function findWebsite(url) {
  res.json({
    code: 200,
    msg: 'c ',
  });
}

module.exports = Website = {
  getWebsite,
  findWebsiteName,
  findWebsite,
  addWebsite,
};
