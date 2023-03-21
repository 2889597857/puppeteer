const express = require('express');
const router = express.Router();

router.ws('/', (ws, req) => {
  // 使用定时器不停的向客户端推动消息
  // let timer = setInterval(() => {
  //   ws.send(`服务端定时推送消息: 1`);
  // }, 1000);

  ws.on('message', function (msg) {
    console.log(JSON.parse(msg));
    ws.send(msg)
  })

  ws.on('close', function (e) {
    console.log('连接关闭')
  });
});

module.exports = router;
