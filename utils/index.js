const { openBrowser, closeBrowser,caches } = require('./browser');
const { executeAsyncTask, taskState ,taskInfo} = require('./executeAsyncTask');
const { getTopURL, verifyID } = require('./common');

module.exports = {
  openBrowser,
  closeBrowser,
  executeAsyncTask,
  taskState,
  getTopURL,
  verifyID,
  taskInfo,
  caches
};
