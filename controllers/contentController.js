const ContentModel = require('../models/contentModel');
const LinkListModel = require('../models/linkListModel')
const getNewsInfo = require('../puppeteer/getNewsInfo')
const jieba = require('@node-rs/jieba')
const { getContentSelect } = require('../controllers/selectorController')

async function addContent(pageContent) {
    return ContentModel.insertMany([pageContent])
}
async function getContent() {
    let a2 = await LinkListModel.find({ state: 0 })
    const { url, website } = a2[81]
    if (website && url) {
        const selector = await getContentSelect(website)
        if (selector) {
            const { titleSelect, timeSelector, contentSelector } = selector
            const a = await getNewsInfo(url, { titleSelect, timeSelector, contentSelector })
            const { title, time, content } = a
            jieba.load()
            const topN = 10;
            a.segmentation = jieba.extract(content.join(''), topN)
            console.log(a);
            if (a) {
                addContent(a)
            }
        }

    }
}
getContent()