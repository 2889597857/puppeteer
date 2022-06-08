const mongoose = require('../config/mongoose')

const ContentSchema = mongoose.Schema({
  title: {
    type: String
  },
  date: {
    type: Date
  },
  content: {
    type: Array
  },
  segmentation: {
    type: Array
  },
  isReported: {
    type: Boolean
  },
  url: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'url'
  },
  website: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'website'
  }
})

const ContentModel = mongoose.model('ContentSchema', ContentSchema, 'content')

module.exports = ContentModel
