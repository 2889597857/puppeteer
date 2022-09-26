async function getNewsList(url, selector, page) {
  // 储存获取的新闻链接
  let links = null;
  try {
    // 打开获取新闻链接的页面
    await page.goto(url);
    // 获取新闻链接
    links = await page.$$eval(selector, (els) =>
      els.length <= 15
        ? els.map((el) => el.href)
        : els.slice(0, 15).map((el) => el.href)
    );
    // 去重
    links = [...new Set(links)];
    return {
      state: true,
      links,
    };
  } catch (error) {
    return {
      state: false,
      error,
    };
  }
}
module.exports = getNewsList;
