const mongoose = require('../config/mongoose');

const WebsiteSchema = mongoose.Schema({
  name: {
    type: String,
  },
  url: {
    type: String,
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
  newsList: [
    {
      url: {
        type: String,
        unique: true,
      },
      // 0 关闭 1 开启
      state: {
        type: Boolean,
        default: true,
      },
      independentSelector: {
        type: Boolean,
        default: false,
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
