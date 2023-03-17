/**
 * 获取新闻标题
 * @param {*} selector
 * @param {*} page
 * @returns string
 */
exports.getTitle = async function getTitle(selector, page) {
  let title = await page.$eval(selector, (el) => el.innerText.trim());
  if (!title)
    title = await page.$eval('title', (el) =>
      el.innerText.trim().split(/[-_]/)[0].trim()
    );
  return title;
};
