const website = require('./routers/website')
module.exports = app => {
  app.use('/website', website)
}
