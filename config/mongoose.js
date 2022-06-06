const mongoose = require('mongoose')
const DBEnv = require('./env')
const auth = `${DBEnv.USER}:${DBEnv.PASSWD}@`
const host = `${DBEnv.IP}:${DBEnv.PORT}/`
const database = DBEnv.DATABASE
const mongoURL = `mongodb://${auth + host + database}?authSource=admin`
mongoose.connect(
  mongoURL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  err => {
    if (err) {
      console.log(err)
    } else {
      console.log('数据库连接成功')
    }
  }
)
module.exports = mongoose

// export default mongoose
