const mongoose = require('../config/mongoose')

const LinkSchema = mongoose.Schema({
  url: {
    type: String
  },
  lastTime: {
    type: Date,
    default: Date.now
  },
  website: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'website'
  }
})

const LinkModel = mongoose.model('LinkSchema', LinkSchema, 'link')

module.exports = LinkModel
