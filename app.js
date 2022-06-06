const express = require('express')
const routers = require('./router')

const app = express()
const port = 3100

app.use(express.static('public'))
app.use(express.json())

// app.use('/', (req, res, next) => {
//     const token = req.headers.authorization
//     if (req.url == "/login") next();
//     else if (token && jwt.verify(token)) next();
//     else res.status(404).send();
// })

routers(app)
app.listen(port, () => {
  console.log(port)
})
