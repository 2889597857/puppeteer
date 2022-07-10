const mongoose = require('../config/mongoose');

const NewsContent = {
  /** 新闻标题 */
  title: {
    type: String,
  },
  /** 新闻发布时间 */
  time: {
    type: Date,
  },
  /** 新闻详情 */
  content: {
    type: String,
  },
  /** 关键词 */
  segmentation: {
    type: Array,
  },
  /** 报送内容 */
  report: {
    type: String,
  },
  /** 是否报送 */
  isReported: {
    type: Boolean,
    default: false,
  },
  /** 报送时间 */
  reportTime: {
    type: Date,
  },
  /** 是否删除 */
  state: {
    type: Number,
    /**
     *  0 未删除
     * 1 已删除 */
    default: 0,
  },
  reportTime: {
    type: Date,
  },
  url: {
    type: String,
  },
  website: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'website',
  },
};

const ContentSchema = mongoose.Schema(NewsContent);

const ContentModel = mongoose.model('ContentSchema', ContentSchema, 'content');

module.exports = ContentModel;
