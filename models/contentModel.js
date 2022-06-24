const mongoose = require('../config/mongoose');

const ContentSchema = mongoose.Schema({
  title: {
    type: String,
  },
  time: {
    type: Date,
  },
  content: {
    type: Array,
  },
  segmentation: {
    type: Array,
  },
  report: {
    type: String,
  },
  isReported: {
    type: Boolean,
    default: false,
  },
  url: {
    type: String,
  },
  website: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'website',
  },
});

const ContentModel = mongoose.model('ContentSchema', ContentSchema, 'content');

module.exports = ContentModel;
