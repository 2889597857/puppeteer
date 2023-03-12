/**
 * 获取新闻标题
 * @param {*} selector
 * @param {*} page
 * @returns string
 */
exports.getTitle = async function getTitle(selector, page) {
  return await page.$eval(selector, (el) => el.innerText.trim());
};
