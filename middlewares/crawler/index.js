const linkCrawler = require('./linkCrawler');
const pageCrawler = require('./pageCrawler');
module.exports = { ...linkCrawler, ...pageCrawler };
