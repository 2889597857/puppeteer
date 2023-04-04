const website = require('./routers/website');
const task = require('./routers/task');
const news = require('./routers/news');
const crawler = require('./routers/crawler');
const chart = require('./routers/chart');
const log = require('./routers/log');

module.exports = (app) => {
  app.use('/news', news);
  app.use('/task', task);
  app.use('/site', website);
  app.use('/crawler', crawler);
  app.use('/log', log);
  app.use('/chart', chart);
};
