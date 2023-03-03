const { sign, verify } = require('jsonwebtoken');
const Env = require('./env');
function createToken({ username, role }, time = '3d') {
  const token = sign({ username, role }, Env.JWT_SECRET, {
    expiresIn: time,
  });
  return token;
}

function verifyToken(token) {
  return verify(token, Env.JWT_SECRET, (err, decode) => {
    if (err) {
      //  时间失效的时候/ 伪造的token
      return false;
    } else {
      return decode;
    }
  });
}
module.exports = {
  createToken,
  verifyToken,
};
