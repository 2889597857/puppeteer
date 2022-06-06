const mongoose = require('../config/mongoose')

const LinkSchema = mongoose.Schema({
  link: {
    type: String
  },
  isRead: {
    type: Boolean,
    default: false
  },
  content: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'content'
  },
  website: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'content'
  }
})

const LinkModel = mongoose.model('LinkSchema', LinkSchema, 'Link')

module.exports = LinkModel
