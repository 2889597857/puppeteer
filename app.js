const express = require('express');
const ws = require('express-ws');
const cors = require('cors');
// const { createToken, verifyToken } = require('./config/jwt');
// const { isAuth } = require('./middlewares');

// const history = require('connect-history-api-fallback');

const app = ws(express()).app;
const port = 888;

app.use(cors());
// app.use(history());
// app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

// app.post('/signin', (req, res) => {
//   res.json({ code: 200, data: { token: createToken(req.body) } });
// });

// app.use('/', isAuth);

const routers = require('./router');
routers(app);

app.listen(port, () => {
  console.log(`监听端口:${port}`);
});
// docker-compose up -d --build