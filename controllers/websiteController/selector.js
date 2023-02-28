const WebsiteModel = require('../../models/websiteModel');
const { getTopURL, verifyID, message } = require('../../utils');

async function addSelector(req, res) {
  const {} = req.query;
}
async function addLinkSelector(req, res) {}
async function addContentSelector(req, res) {}

module.exports = {
  addSelector,
  addLinkSelector,
  addContentSelector,
};
