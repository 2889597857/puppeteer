const express = require('express');
const routers = require('./router');
const cors = require('cors');
// const history = require('connect-history-api-fallback');
const { createToken, verifyToken } = require('./config/jwt');
const { isAuth } = require('./middlewares');
const app = express();
const port = 888;

app.use(cors());
// app.use(history());
// app.use(express.static('public'));
app.use(express.json());

app.post('/signin', (req, res) => {
  res.json({ code: 200, data: { token: createToken(req.body) } });
});

app.use('/', isAuth);

routers(app);

app.listen(port, () => {
  console.log(`监听端口:${port}`);
});
