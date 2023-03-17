const ContentModel = require('../../models/contentModel');
const { getTitle, getTime, getContent,formatContent } = require('./utils');

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
        content: contentSelector,
      } = selector;
      
      if (!pageTitle) pageTitle = await getTitle(titleSelector, page);
      if (!pageTime) pageTime = await getTime(timeSelector, page);
      if (pageContent.length === 0)
        pageContent = await getContent(contentSelector, page);

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
