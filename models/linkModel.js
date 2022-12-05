const mongoose = require('../config/mongoose');
// 获取新闻列表的页面
const LinkSchema = mongoose.Schema({
  url: {
    type: String,
    unique: true,
  },
  // 0 关闭 1 开启
  isCollected: {
    type: Number,
    default: 1,
  },
  lastTime: {
    type: Date,
    default: Date.now,
  },
  website: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'website',
  },
});

const LinkModel = mongoose.model('LinkSchema', LinkSchema, 'link');

module.exports = LinkModel;
