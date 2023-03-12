const { createAllLinkTask, createLinkTask, getURL } = require('./linkCrawler');
const { createContentTask, getContent } = require('./pageCrawler');
const crawlerNewsContent = require('./crawlerNews');
const crawlerNewsUrl = require('./crawlerURL');

module.exports = {
  createAllLinkTask,
  createLinkTask,
  getURL,
  createContentTask,
  getContent,
  crawlerNewsContent,
  crawlerNewsUrl
};
