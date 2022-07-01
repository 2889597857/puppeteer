const Router = require('express');
const { getContent } = require('../../controllers/contentController');
const router = Router();

router.get('/', async (req, res) => {
  const pageSize = req.query.page;
  if (pageSize && parseInt(pageSize, 10)) {
    const data = await getContent(parseInt(pageSize, 10));
    if (data.state) {
      res.json({ code: 200, date: data.data });
    } else {
      res.json({ code: 200, msg: data.msg });
    }
  } else {
    res.json({ code: 404, msg: '参数不存在或参数错误' });
  }
});

module.exports = router;
