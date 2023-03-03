const mongoose = require('../config/mongoose');

const UserSchema = mongoose.Schema({
  username: { type: String },
  password: { type: String },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin', 'super', 'disabled'],
  },
});

const UserModel = mongoose.model('UserSchema', UserSchema, 'user');

module.exports = UserModel;
