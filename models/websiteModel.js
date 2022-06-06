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
  add (website) {
    return this.insert(website)
  }
}
const WebsiteModel = mongoose.model('Website', WebsiteSchema, 'Website')

module.exports = WebsiteModel
