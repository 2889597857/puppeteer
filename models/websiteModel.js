const mongoose = require('../config/mongoose');

const WebsiteSchema = mongoose.Schema({
  name: {
    type: String,
  },
  url: {
    type: String,
    unique: true,
  },
  state: {
    type: Boolean,
    default: true,
  },
  /**
   * 默认链接选择器
   */
  defaultListSelector: {
    type: String,
  },
  newsLinks: [
    {
      url: {
        type: String,
      },
      // 0 关闭 1 开启
      state: {
        type: Boolean,
        default: true,
      },
      selector: {
        type: String,
      },
      lastTime: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  contentSelector: [{}],
});
WebsiteSchema.statics = {
  get(url) {
    return this.findOne({ url })
      .exec()
      .then((website) => website);
  },
};
const WebsiteModel = mongoose.model('Website', WebsiteSchema, 'website');

module.exports = WebsiteModel;
