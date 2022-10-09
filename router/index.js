const website = require('./routers/website')
const link = require('./routers/link')
const task = require('./routers/task')
const news = require('./routers/news')

module.exports = app => {
  // app.use('/website', website)
  app.use('/task', task)
  app.use('/link', link)
  app.use('/news', news)
}
