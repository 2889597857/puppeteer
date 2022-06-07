const LinkListModel = require('../models/linkListModel')

async function addContentLinks (links) {
  return await LinkListModel.insertMany(links)
}

module.exports = { addContentLinks }
