const mongoose = require('../config/mongoose');

const NewsContent = {
  /** 新闻标题 */
  title: {
    type: String,
  },
  /** 新闻链接 */
  url: {
    type: String,
    unique: true,
  },
  /** 报送内容 */
  report: {
    type: String,
  },
  /** 新闻详情 */
  content: {
    type: String,
  },
  /** 新闻发布时间 */
  time: {
    type: Date,
  },
  /** 关键词 */
  segmentation: {
    type: Array,
  },
  /** 报送时间 */
  reportTime: {
    type: Date,
  },
  /**
   * 0  未报送
   * 1  已报送
   * 2 已删除 */
  state: {
    type: Number,
    default: 0,
  },
  website: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'website',
  },
};

const ContentSchema = mongoose.Schema(NewsContent);

const ContentModel = mongoose.model('ContentSchema', ContentSchema, 'content');

module.exports = ContentModel;
