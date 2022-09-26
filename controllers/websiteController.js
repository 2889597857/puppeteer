const WebsiteModel = require('../models/websiteModel');
async function addWebsite(website) {
  if (!website) return false;

  let { name, url } = website;
  url = getTopURL(url);
  const existsWebsite = findWebsite(url);
  const res = await WebsiteModel.insertMany([{ name, url }]);
  return res;
}
async function findWebsite(url) {
  return await WebsiteModel.get('https://ah.ifeng.com');
}
module.exports = {
  addWebsite,
  findWebsite,
};

