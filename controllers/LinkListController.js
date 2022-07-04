const LinkListModel = require('../models/linkListModel')

async function addContentLink (links) {
  return await LinkListModel.insertMany(links)
}

async function findOneContentLink (url) {
  return await LinkListModel.findOne({ url })
}

async function findAllContentLink () {
  return await LinkListModel.find({ state: 0 })
    .limit(100)
    .exec()
}

async function removeContentLink (url) {
  return await LinkListModel.deleteOne({ url })
}

async function updateLinkState (url, state) {
  return await LinkListModel.findOneAndUpdate(
    { url }, // 条件
    { state }, // 更新的内容
    { new: true } //  返回更新后的数据
  )
}
module.exports = {
  addContentLink,
  findOneContentLink,
  removeContentLink,
  updateLinkState,
  findAllContentLink
}
