const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Env = require('../config/env');

exports.isAuth = async (req, res, next) => {
  // 1) 获取token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      code: 201,
      message: '请登录',
    });
  }
  // 2) 验证 Token
  const decoded = await promisify(jwt.verify)(token, Env.JWT_SECRET);

  //  3) 验证 用户
  const freshUser = await User.findOne({ name: decoded.name });

  if (!freshUser) {
    return res.status(401).json({
      status: 'Not authorized',
      message: 'The user belonging to this token does no longer exists',
    });
  }

  req.user = freshUser.username;
  req.role = freshUser.role;
  next();
};
