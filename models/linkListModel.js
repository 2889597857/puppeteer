const mongoose = require('../config/mongoose');
const dayjs = require('dayjs');
// 新闻列表
const LinkListSchema = mongoose.Schema({
  url: {
    type: String,
    unique: true,
  },
  /** 
   * 0 内容未采集
   * 1 采集成功
   * 2 采集失败
   */
  state: {
    type: Number,
    default: 0,
  },
  /**
   * 链接收集时间
   */
  lastTime: {
    type: Date,
    default: dayjs().format(),
  },
  website: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'website',
  },
});

const LinkListModel = mongoose.model(
  'LinkListSchema',
  LinkListSchema,
  'linkList'
);

module.exports = LinkListModel;
