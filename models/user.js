const mongoose = require('../config/mongoose');

const RouteSchema = mongoose.Schema({
  /** 创建时间 */
  role: {
    type: String,
    default: 'user',
  },
  account: { type: String },
  password: { type: String },
  route: String,
});

const RouteModel = mongoose.model('RouteSchema', RouteSchema, 'Route');

module.exports = RouteModel;
