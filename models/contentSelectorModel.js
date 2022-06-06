const mongoose = require('../config/mongoose')

const ContentSelectorSchema = mongoose.Schema({
  titleSelect: String,
  contentSelector: String,
  timeSelector: String,
  website: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'website'
  }
})
ContentSelectorSchema.statics = {
  get (url) {
    return this.findOne({ website: url })
  }
}
const ContentSelectorModel = mongoose.model(
  'ContentSelector',
  ContentSelectorSchema,
  'contentSelector'
)

module.exports = ContentSelectorModel
