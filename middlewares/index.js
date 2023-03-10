const {
  createTypeTask,
  executeTask,
  startTask,
  createAndExecuteTypeTask,
} = require('./task');

const { isAuth } = require('./auth/isAuthentication');

const {
  createAllLinkTask,
  createLinkTask,
  getURL,
  createContentTask,
  getContent,
  crawlerNewsContent,
} = require('./crawler');

module.exports = {
  createTypeTask,
  executeTask,
  startTask,
  createAndExecuteTypeTask,
  isAuth,
  createAllLinkTask,
  createLinkTask,
  getURL,
  createContentTask,
  getContent,
  crawlerNewsContent,
};
