const dayjs = require('dayjs');
const { getTopURL } = require('../utils');
const jieba = require('@node-rs/jieba');
const ContentModel = require('../models/contentModel');
/**
 * 获取新闻标题
 * @param {*} selector
 * @param {*} page
 * @returns string
 */
async function getTitle(selector, page) {
  return await page.$eval(selector, (el) => el.innerText.trim());
}
/**
 * 获取新闻发布时间
 * @param {*} selector
 * @param {*} page
 * @returns string
 */

async function getTime(selector, page) {
  // 获取新闻发布时间
  let pageTime = await page.$eval(selector, (el) => el.innerText.trim());
  if (!pageTime) return '';
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
  return pageTime;
}
/**
 * 获取新闻内容
 * @param {*} selector
 * @param {*} page
 * @returns array
 */
async function getContent(selector, page) {
  return await page.$eval(selector, (el) =>
    el.innerText
      .split('\n')
      .filter(Boolean)
      .map((el) => el.trim())
  );
}
/**
 * 对新闻第一段内容进行处理
 * @param {*} content
 * @returns array
 */
function formaFirstText(content, url) {
  const topURL = getTopURL(url);
  if (topURL === 'www.ahwang.cn') {
    if (content[0].includes('凡本报记者署名文字')) return content.shift();
  }
  return content;
}
/**
 * 获取报送内容和新闻关键字
 * @param {*} content
 * @returns
 */
async function formatContent(content, url) {
  const textArr = formaFirstText(content, url);

  // 默认报送内容为新闻前两段
  // 如果新闻第一段字数大于 75 字。报送内容为新闻第一段
  const reportLength = textArr.length >= 2 && textArr[0].length <= 75;
  /** 新闻摘要 */
  const report = reportLength ? `${textArr[0]}${textArr[1]}` : textArr[0];

  // 获取新闻关键词
  const MAX = 10;
  const keywords = jieba.extract(textArr.join(''), MAX);
  const segmentation = keywords.map((el) => el.keyword);

  return {
    report,
    segmentation,
  };
}
/**
 * 获取新闻信息
 * @param {*} url
 * @param {*} selectors
 * @param {*} page
 * @returns
 */
module.exports = async function getNewsInfo(url, selectors, page) {
  try {
    let pageTitle = '',
      pageTime = '',
      pageContent = [];
    // 打开链接
    await page.goto(url);
    for await (const selector of selectors) {
      const {
        title: titleSelector,
        time: timeSelector,
        content: Selector,
      } = selector;
      if (!pageTitle) pageTitle = await getTitle(titleSelector, page);
      if (!pageTime) pageTime = await getTime(timeSelector, page);
      if (pageContent.length === 0)
        pageContent = await getContent(Selector, page);

      if (pageTitle && pageTime && pageContent.length !== 0) break;
    }

    if (!pageTitle)
      return {
        state: false,
        code: 1001,
      };

    const a = await ContentModel.findOne({ title: pageTitle });
    if (a != null)
      return {
        state: false,
        code: 10011,
      };

    if (pageContent.length === 0)
      return {
        state: false,
        code: 1003,
      };

    if (!pageTime) pageTime = new Date();

    const { report, segmentation } = await formatContent(pageContent, url);

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
    return {
      state: false,
      code: 1004,
      message: e.message,
    };
  }
};
