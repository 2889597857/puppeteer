const mongoose = require('../config/mongoose');

const UserSchema = mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    /**
     * 查询结果默认不返回密码
     * find().select("+password")
     */
    select: false,
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin', 'super', 'disabled'],
  },
});

const UserModel = mongoose.model('UserSchema', UserSchema, 'user');

module.exports = UserModel;
