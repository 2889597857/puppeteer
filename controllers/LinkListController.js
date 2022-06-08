const LinkListModel = require('../models/linkListModel')

async function addContentLink(links) {
  return await LinkListModel.insertMany(links)
}

async function findContentLink(url) {
  return await LinkListModel.findOne({ url })
}
module.exports = { addContentLink, findContentLink }
