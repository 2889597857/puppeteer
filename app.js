const express = require('express');
const routers = require('./router');
const cors = require('cors');

const app = express();
const port = 888;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
// app.use('/', (req, res, next) => {
//     const token = req.headers.authorization
//     if (req.url == "/login") next();
//     else if (token && jwt.verify(token)) next();
//     else res.status(404).send();
// })

routers(app);

app.listen(port, () => {
  console.log(`监听端口:${port}`);
});
