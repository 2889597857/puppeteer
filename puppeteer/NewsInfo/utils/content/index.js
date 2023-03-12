const { getTopURL } = require('../../utils');
const jieba = require('@node-rs/jieba');

/**
 * 获取新闻内容
 * @param {*} selector
 * @param {*} page
 * @returns array
 */

exports.getContent = async function (selector, page) {
  return await page.$eval(selector, (el) =>
    el.innerText
      .split('\n')
      .filter(Boolean)
      .map((el) => el.trim())
  );
};
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
exports.formatContent = async function (content, url) {
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
};
