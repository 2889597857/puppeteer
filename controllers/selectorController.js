const LinkSelectorModel = require('../models/linkSelectorModel')
const ContentSelectorModel = require('../models/contentSelectorModel')
const WebsiteModel = require('../models/websiteModel')
const { getTopURL } = require('../utils')

async function getLinkSelect (url) {
  const topURL = getTopURL(url)
  WebsiteModel.find({ url: topURL })
}
async function addLinkSelect ({ url, selector }) {
  const topURL = getTopURL(url)
  const { _id } = await WebsiteModel.findOne({ url: topURL })
  const res = await LinkSelectorModel.insertMany([
    { selector, website: _id.toHexString() }
  ])
  return res
}
async function getContentSelect (url, options) {
  const topURL = getTopURL(url)
}
async function addContentSelect (options) {
  const { url, titleSelect, contentSelector, timeSelector } = options
  const topURL = getTopURL(url)
  const { _id } = await WebsiteModel.findOne({ url: topURL })
  const res = await ContentSelectorModel.insertMany([
    { titleSelect, contentSelector, timeSelector, website: _id.toHexString() }
  ])
  return res
}
