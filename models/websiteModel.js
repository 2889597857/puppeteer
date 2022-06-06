const mongoose = require('../config/mongoose')

const WebsiteSchema = mongoose.Schema({
  name: {
    type: String
  },
  url: {
    type: String
  }
})
WebsiteSchema.statics = {
  get (url) {
    return this.findOne({ url })
      .exec()
      .then(website => website)
  }
}
const WebsiteModel = mongoose.model('Website', WebsiteSchema, 'website')

module.exports = WebsiteModel
