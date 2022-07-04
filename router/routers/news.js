const Router = require('express');
const {
  getContent,
  getNewContent,
  updateReport,
  deleteNews,
} = require('../../controllers/contentController');
const { verifyID } = require('../../utils');
const router = Router();

router.get('/', async (req, res) => {
  const pageSize = req.query.page;
  if (pageSize && parseInt(pageSize, 10)) {
    const data = await getContent(parseInt(pageSize, 10));
    if (data.state) {
      res.json({ code: 200, data: data.data });
    } else {
      res.json({ code: 200, msg: data.msg });
    }
  } else {
    res.json({ code: 404, msg: '参数不存在或参数错误' });
  }
});

router.get('/content', async (req, res) => {
  const id = req.query._id;
  if (id) {
    const data = await getNewContent(id);
    if (data.state) {
      res.json({ code: 200, data: data.data });
    } else {
      res.json({ code: 200, msg: data.msg });
    }
  } else {
    res.json({ code: 404, msg: '参数不存在或参数错误' });
  }
});

router.post('/updateReport', async (req, res) => {
  const { _id, report } = req.body;
  if (verifyID(_id) && report) {
    const data = await updateReport(_id, report);
    if (data.state) {
      res.json({ code: 200, data: data.data });
    } else {
      res.json({ code: 200, msg: data.msg });
    }
  } else {
    res.json({ code: 404, msg: '_id 不合法' });
  }
});

router.delete('/deleteNews', async (req, res) => {
  const id = req.query._id;
  if (verifyID(id)) {
    const data = await deleteNews(id);
    if (data.state) {
      res.json({ code: 200, data: data.msg });
    } else {
      res.json({ code: 201, msg: data.msg });
    }
  } else {
    res.json({ code: 404, msg: '_id 不合法' });
  }
});

module.exports = router;
