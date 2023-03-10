const { createAllLinkTask, createLinkTask, getURL } = require('./linkCrawler');
const { createContentTask, getContent } = require('./pageCrawler');
const crawlerNewsContent = require('./crawlerNews');

module.exports = {
  createAllLinkTask,
  createLinkTask,
  getURL,
  createContentTask,
  getContent,
  crawlerNewsContent,
};
