const { findOneAndUpdate } = require('../../models/linkListModel');
const LinkListModel = require('../../models/linkListModel');

// 添加新闻链接
async function addContentLink(links) {
  try {
    return await LinkListModel.insertMany([links]);
  } catch (error) {
    return false;
  }
}
/**
 * 查询链接是否存在
 * @param {string} url
 * @returns
 */
async function findOneContentLink(url) {
  return await LinkListModel.findOne({ url });
}
/**
 * 查询全部新闻链接
 * 0 未收集
 * 1 已收集
 * 2 收集失败
 * @param {number} state
 * @returns
 */
async function findAllContentLink(state = 0) {
  return await LinkListModel.find({ state }).sort({ lastTime: -1 });
}
/**
 * 更新链接状态
 * 0 未收集
 * 1 已收集
 * 2 收集失败
 * @param {*} url
 * @param {*} state
 * @returns
 */
// findOneAndUpdate
// findOneContentLink
//  { url }, // 条件
//  { state }, // 更新链接的状态 0 未抓取 1 抓取成功 2 抓取失败
//  { new: true } //  返回更新后的数据 默认返回更新前的数据

async function updateLinkState(url, state) {
  return await LinkListModel.updateOne(
    { url }, // 条件
    { state } // 更新链接的状态 0 未抓取 1 抓取成功 2 抓取失败
  );
}
module.exports = {
  addContentLink,
  findOneContentLink,
  updateLinkState,
  findAllContentLink,
};
