const mongoose = require('../config/mongoose');

const RouteSchema = mongoose.Schema({
  /** 创建时间 */
  role: String,
  route:String,
});

const RouteModel = mongoose.model('RouteSchema', RouteSchema, 'Route');

module.exports = RouteModel;
