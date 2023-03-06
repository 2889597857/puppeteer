const dayjs = require('dayjs');
const { getTopURL } = require('../utils');
const jieba = require('@node-rs/jieba');
const ContentModel = require('../models/contentModel');
const { errors } = require('puppeteer');
async function getNewsInfo(url, selector, page) {
  try {
    const { titleSelect, timeSelector, contentSelector } = selector;
    // 打开新闻页面
    await page.goto(url);

    // 获取新闻标题
    const pageTitle = await page.$eval(titleSelect, (el) =>
      el.innerText.trim()
    );

    const a = ContentModel.findOne({ title: pageTitle });

    if (a != null) {
      return {
        state: false,
        code: 3,
      };
    }

    // 获取新闻内容
    const pageContent = await page.$eval(contentSelector, (el) => {
      // 新闻内容进行处理，去除 \n 等无效内容
      let content = el.innerText
        .split('\n')
        .filter(Boolean)
        .map((el) => el.trim());
      return content.length <= 10 ? content : content.slice(0, 10);
    });

    if (!pageContent || pageContent.length === 0)
      return {
        state: false,
        code: 4,
      };

    // 获取新闻发布时间
    let pageTime = await page.$eval(timeSelector, (el) => el.innerText.trim());
    // 发布时间有多种格式
    // 2022-07-01 07:14:58
    // 2022年06月30日17:20
    if (pageTime.includes('年')) {
      const reg = pageTime.match(
        /(\d*)年(\d*)月(\d*)日\s?([0-9]*:[0-9]*:?[0-9]*?)/
      );
      const year = reg[1];
      const mouth = reg[2];
      const day = reg[3];
      const time = reg[4];
      pageTime = dayjs(year + mouth + day + ' ' + time).format();
    } else {
      pageTime = dayjs(pageTime.match(/\d*-\d*-\d*.?\d*:\d*:?\d*?/g)).format();
    }

    const topURL = getTopURL(url);
    if (topURL === 'www.ahwang.cn') {
      if (pageContent[0].includes('凡本报记者署名文字')) {
        pageContent.shift();
      }
    }

    // 默认报送内容为新闻前两段
    // 如果新闻第一段字数大于 75 字。报送内容为新闻第一段
    const contentLength =
      pageContent.length >= 2 && pageContent[0].length <= 75;
    /** 新闻摘要 */
    const report = contentLength
      ? `${pageContent[0]}${pageContent[1]}`
      : pageContent[0];

    // 获取新闻关键词
    const topN = 10;
    const content = pageContent.join('');
    const keywords = jieba.extract(content, topN);
    const segmentation = keywords.map((el) => el.keyword);

    return {
      state: true,
      content: {
        title: pageTitle,
        url,
        time: pageTime,
        report,
        segmentation,
      },
    };
  } catch (e) {
    let code = 2;
    if (e instanceof errors.TimeoutError) {
      code = 3;
    }
    console.log(url);
    console.log(JSON.stringify(e));
    return {
      state: false,
      code,
    };
  }
}
module.exports = { getNewsInfo };

// const puppeteer = require('puppeteer');

// async function openBrowser() {
//   const browser = await puppeteer.launch({ headless: true, timeout: 1000 });
//   return browser.newPage();
// }

// async function a() {
//   const page = await openBrowser();

//   getNewsInfo(
//     'http://www.ahnews.com.cn/yaowen1/pc/con/2022-09/26/496_678169.html',
//     {
//       titleSelect: '.h-p3.clearfix.bb1 > div > div.h-title',
//       contentSelector: '#p-detail',
//       timeSelector: '.clearfix.bb1 > div > div.h-info > span.h-time',
//     },
//     page
//   ).then((res) => console.log(res));
// }

// a();
