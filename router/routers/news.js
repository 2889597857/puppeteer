const Router = require('express');
const {
  getContent,
  getNewContent,
  updateReport,
  updateNewsState,
  deleteNews,
  getReportNews,
  updateReportTime,
} = require('../../controllers/contentController');
const { verifyID } = require('../../utils');
const router = Router();

router.get('/', async (req, res) => {
  const pageSize = req.query.page || 1;
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

router.get('/reportNews', async (req, res) => {
  const date = req.query.date;
  const data = await getReportNews(parseInt(date, 10));
  if (data.state) {
    res.json({ code: 200, data: data.data });
  } else {
    res.json({ code: 200, msg: data.msg });
  }
});

router.get('/content', async (req, res) => {
  const id = req.query._id;
  if (verifyID(id)) {
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

router.post('/updateNewsState', async (req, res) => {
  const { _id, state } = req.body;

  if (verifyID(_id) && parseInt(state) >= 0) {
    const data = await updateNewsState(_id, state);
    res.json({ code: 200, data: data.data });
  } else {
    res.json({ code: 202, msg: '_id ' });
  }
});

router.post('/updateReportTime', async (req, res) => {
  const { _id, date } = req.body;
  if (verifyID(_id) && parseInt(date)) {
    const data = await updateReportTime(_id, date);
    res.json({ code: 200, data: data.data });
  } else {
    res.json({ code: 202, msg: '_id ' });
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
