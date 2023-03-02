const { openBrowser, closeBrowser,caches } = require('./browser');
const { executeAsyncTask, taskState ,taskInfo} = require('./executeAsyncTask');
const { getTopURL, verifyID,urlRegExp } = require('./common');
const message = require('./message');

module.exports = {
  openBrowser,
  closeBrowser,
  executeAsyncTask,
  taskState,
  getTopURL,
  verifyID,
  taskInfo,
  caches,
  message,
  urlRegExp
};
