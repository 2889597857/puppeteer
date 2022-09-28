const dayjs = require('dayjs');
const ContentModel = require('../../models/contentModel');
const { verifyID } = require('../../utils');

async function getReportNews(req, res) {
  const date = parseInt(req.query.date);
  if (date) {
    const condition = {
      state: 1,
      reportTime: {
        $gte: dayjs(date).format(),
        $lte: dayjs(date).add(1, 'day').format(),
      },
    };
    console.log(condition);
    const option = {
      __v: 0,
      content: 0,
      segmentation: 0,
      time: 0,
      state: 0,
    };

    const data = await ContentModel.find(condition, option)
      .sort({ reportTime: 1 })
      .exec();
    if (data) {
      res.json({ code: 200, data });
    } else {
      res.json({ code: 201, msg: '错误' });
    }
  } else {
    res.json({ code: 201, msg: '错误' });
  }
}
async function updateReportTime(req, res) {
  const { _id, date } = req.body;
  if (verifyID(_id) && parseInt(date)) {
    const data = await ContentModel.findOneAndUpdate(
      { _id },
      { reportTime: dayjs(date).format() },
      { new: true }
    );
    if (data !== null) {
      const { _id, reportTime } = data;
      res.json({ code: 200, data: { _id, time: reportTime } });
    }
  } else {
    res.json({ code: 202, msg: '_id ' });
  }
}

async function updateReport(req, res) {
  const { _id, report } = req.body;
  if (verifyID(_id) && report) {
    const data = await ContentModel.findOneAndUpdate(
      { _id },
      { report },
      { new: true }
    );

    if (data !== null) {
      // 更新成功
      const { report } = data;

      res.json({
        code: 200,
        data: {
          _id,
          report,
        },
      });
    } else {
      // 更新失败
      res.json({ code: 201, msg: data.msg });
    }
  } else {
    res.json({ code: 404, msg: '_id 不合法' });
  }
}

module.exports = {
  getReportNews,
  updateReportTime,
  updateReport,
};