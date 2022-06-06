const mongoose = require('../config/mongoose')

const LinkSelectorSchema = mongoose.Schema({
  selector: {
    type: String
  },
  website: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'website'
  }
})
LinkSelectorSchema.statics = {
  get () {
    this.find().populate
  }
}

const LinkSelectorModel = mongoose.model(
  'LinkSelector',
  LinkSelectorSchema,
  'linkSelector'
)

module.exports = LinkSelectorModel
