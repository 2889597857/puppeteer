const website = require('./routers/website')
const link = require('./routers/link')
module.exports = app => {
  app.use('/website', website)
}
