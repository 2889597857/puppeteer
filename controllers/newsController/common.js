const dayjs = require('dayjs');
const ContentModel = require('../../models/contentModel');
const { verifyID } = require('../../utils');

async function getNewsList(req, res) {
  let pageSize = parseInt(req.query.page, 10);
  if (pageSize && pageSize > 0) {
    const pageCount = 25;
    const totalCount = await ContentModel.count({ state: 0 });
    const totalPages = Math.ceil(totalCount / pageCount);

    // 参数页数是否大于最大页数，大于返回最后一页
    pageSize = pageSize > totalPages ? totalPages : pageSize;

    const option = {
      __v: 0,
      content: 0,
      segmentation: 0,
      reportTime: 0,
      state: 0,
    };

    const data = await ContentModel.find({ state: 0 }, option)
      .sort({ time: -1 })
      .skip((pageSize - 1) * pageCount)
      .limit(pageCount)
      .exec();

    res.json({
      code: 200,
      data: {
        currentPage: pageSize,
        totalPages,
        data,
      },
    });
  } else {
    res.json({ code: 404, msg: '参数不存在或参数错误' });
  }
}

async function getNewsDetails(req, res) {
  const _id = req.query._id;
  if (verifyID(_id)) {
    const { content } = await ContentModel.findOne({ _id });

    if (content) {
      res.json({
        code: 200,
        data: {
          _id,
          content,
        },
      });
    } else {
      res.json({ code: 201, msg: '参数不存在或参数错误' });
    }
  } else {
    res.json({ code: 404, msg: '参数不存在或参数错误' });
  }
}

async function deleteNews(state = 2) {
  return ContentModel.deleteMany({ state });
}

async function updateNewsState(req, res) {
  const { _id, state } = req.body;

  if (verifyID(_id) && parseInt(state) >= 0) {
    const data = await ContentModel.findOneAndUpdate(
      { _id },
      { state, reportTime: dayjs().format() },
      { new: true }
    );
    if (data !== null) {
      const { _id, state } = data;
      res.json({ code: 200, data: { _id, state } });
    }
  } else {
    res.json({ code: 202, msg: '_id ' });
  }
}

/**
 * 添加新闻
 * @param {*} content
 * @returns
 */
async function createNews(content) {
  return ContentModel.insertMany([content]);
}

/**
 * 彻底删除新闻
 * state = 2 或 具体某一条
 * @param {string | boolean} _id
 * @param {boolean} all
 * @returns
 */
async function deleteNews(_id, all = false) {
  let data;
  if (!_id && all) data = await ContentModel.deleteMany({ state: 2 });
  else if (_id && !all) data = await ContentModel.deleteOne({ _id });

  if (data.acknowledged && data.deletedCount > 0) {
    const message = _id
      ? `已删除${_id}`
      : `删除${data.deletedCount}条新闻,回收站已清空`;
    console.log(message);
    return data;
  } else return '删除失败';
}

/**
 * 删除 2 天前的新闻
 * @param {*} _id
 * @returns
 */
async function clearInvalidNews() {
  const { acknowledged, deletedCount } = await ContentModel.deleteMany({
    state: 0,
    time: { $lte: dayjs().subtract(2, 'day').format() },
  });
  if (acknowledged) {
    console.log(`已删除${deletedCount}条过期新闻`);
    return deletedCount;
  }
}

module.exports = {
  getNewsList,
  createNews,
  updateNewsState,
  updateNewsState,
  getNewsDetails,
  clearInvalidNews,
  deleteNews,
};
// clearInvalidNews();
// deleteNews(false, true);
// ContentModel.updateMany(
//   { state: 1, time: { $lte: dayjs().subtract(2, 'day').format() } },
//   {
//     segmentation: [],
//     content: '',
//   }
// ).then((res) => console.log(res));
