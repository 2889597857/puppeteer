const {
  createTypeTask,
  executeTask,
  startTask,
  createAndExecuteTypeTask,
} = require('./task');

const { isAuth, isAdmin } = require('./auth/isAuthentication');

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
  isAdmin,
  createAllLinkTask,
  createLinkTask,
  getURL,
  createContentTask,
  getContent,
  crawlerNewsContent,
};
