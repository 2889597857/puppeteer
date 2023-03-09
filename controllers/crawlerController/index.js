const crawlerSwitch = require('./crawlerSwitch');
const linkCrawler = require('../../middlewares/linkCrawler');
const pageCrawler = require('../../middlewares/pageCrawler');
module.exports = {
  ...crawlerSwitch,
  ...linkCrawler,
  ...pageCrawler,
};
