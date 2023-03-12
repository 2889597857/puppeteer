const dayjs = require('dayjs');
/**
 * 获取新闻发布时间
 * @param {*} selector
 * @param {*} page
 * @returns string
 */

exports.getTime = async function getTime(selector, page) {
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
};
