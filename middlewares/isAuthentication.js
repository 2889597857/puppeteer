const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Middleware
exports.isAuth = async (req, res, next) => {
  // 1) Getting token and check if its there
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
  // 2) Verification Token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //  { username: 'levani '}

  // 3) Check if user still exists  (SECURITY)
  const freshUser = await User.findOne({ email: decoded.email });

  if (!freshUser) {
    return res.status(401).json({
      status: 'Not authorized',
      message: 'The user belonging to this token does no longer exists',
    });
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = freshUser;

  next();
};
