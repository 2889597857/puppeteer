const { addContent } = require('../controllers/contentController')
const LinkListModel = require('../models/linkListModel')
const getNewsInfo = require('../puppeteer/getNewsInfo')
const jieba = require('@node-rs/jieba')
const { getContentSelect } = require('../controllers/selectorController')
const { executeAsyncTask } = require('../utils')

async function createTasks() {
    const linkList = await LinkListModel.find({ state: 0 })
    if (linkList) {
        const taskList = []
        for (const link of linkList) {
            const { url, website, _id } = link
            if (website && url) {
                const selector = await getContentSelect(website)
                if (selector) {
                    const { titleSelect, timeSelector, contentSelector } = selector
                    taskList.push({
                        url,
                        selector: {
                            titleSelect, timeSelector, contentSelector
                        },
                    })
                }
            }
        }
        return taskList
    }
}

async function getContent({ url, selector }) {
    console.log(url)
    console.log(selector)
    const pageContent = await getNewsInfo(url, selector)

    // const { content } = pageContent
    // const topN = 20
    // pageContent.segmentation = jieba.extract(content.join(''), topN)
    // pageContent.url = url
    // if (pageContent) {
    //     const content = await addContent(pageContent)
    //     if (content) {
    //         return true
    //     }
    // }
}


async function start() {
    const taskList = await createTasks()
    const linkList = await executeAsyncTask(taskList, getContent)
    console.log(linkList);
}


getContent({
    url: 'http://ah.people.com.cn/n2/2022/0606/c358428-35301554.html',
    selector: {
        titleSelect: '#newstit',
        timeSelector: 'body > div.main > div.layout.rm_txt.cf > div.col.col-1.fl > div.channel.cf > div.col-1-1.fl',
        contentSelector: 'body > div.main > div.layout.rm_txt.cf > div.col.col-1.fl > div.rm_txt_con.cf'
    }
})
