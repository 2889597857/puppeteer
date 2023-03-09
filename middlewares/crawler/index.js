const linkCrawler = require('./linkCrawler');
const pageCrawler = require('./pageCrawler');
const crawlerNewsContent = require('./crawlerNews');
module.exports = { ...linkCrawler, ...pageCrawler, crawlerNewsContent };
