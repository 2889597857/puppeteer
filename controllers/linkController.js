const LinkModel = require('../models/linkModel')
const { getTopURL } = require('../utils')
const WebsiteModel = require('../models/websiteModel')


async function addLink(url) {
    const link = await getLink(url)
    if (link !== null) return Promise.resolve({
        msg: 'URL已存在',
        data: link
    })

    const topURL = getTopURL(url)
    const website = await WebsiteModel.findOne({ url: topURL })
    console.log(website)
    if (website !== null) {
        const { _id } = website
        const data = await LinkModel.insertMany([
            { url, website: _id.toHexString() }
        ])
        return {
            msg: '添加成功',
            data
        }
    } else {
        return {
            msg: '添加失败',
            data: url
        }
    }
}

async function getLink(url) {
    return await LinkModel.findOne({ url })
}

module.else = {
    addLink,
    getLink
}