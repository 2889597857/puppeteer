const { sign, verify } = require('jsonwebtoken');

const secretKey = 'whcss';

export function createToken({ account, role }, time = '3d') {
  const token = sign({ account: account, role: role }, secretKey, {
    expiresIn: time,
  });
  return token;
}

export function verifyToken(token) {
  return verify(token, secretKey, (err, decode) => {
    if (err) {
      //  时间失效的时候/ 伪造的token
      return false;
    } else {
      return decode;
    }
  });
}
