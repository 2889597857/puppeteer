const ContentModel = require('../models/contentModel')

async function addContent (pageContent) {
  return ContentModel.insertMany([pageContent])
}
async function getContent () {
  return await ContentModel.find({}, { __v: 0 })
    .limit(100)
    .exec()
}

module.exports = {
  addContent,
  getContent
}
