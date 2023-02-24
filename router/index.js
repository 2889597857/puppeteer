const website = require('./routers/website');
const task = require('./routers/task');
const news = require('./routers/news');

module.exports = (app) => {
  app.use('/site', website);
  app.use('/news', news);
  app.use('/task', task);
};
