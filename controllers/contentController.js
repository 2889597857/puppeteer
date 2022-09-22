const dayjs = require('dayjs');
const ContentModel = require('../models/contentModel');

/**
 * 添加新闻
 * @param {*} pageContent
 * @returns
 */
async function addContent(pageContent) {
  return ContentModel.insertMany([pageContent]);
}
/**
 * 获取新闻。每页 25 条
 * @param {number} page 第几页
 * @returns
 */
async function getContent(page) {
  const totalCount = await ContentModel.count({ state: 0 });
  const totalPages = Math.ceil(totalCount / 25);
  if (page > 0 && page <= totalPages) {
    const option = {
      __v: 0,
      content: 0,
      segmentation: 0,
      reportTime: 0,
      state: 0,
    };
    const data = await ContentModel.find({ state: 0 }, option)
      .sort({ time: -1 })
      .skip((page - 1) * 25)
      .limit(25)
      .exec();
    return {
      state: true,
      data: {
        currentPage: page,
        totalPages,
        data,
      },
    };
  } else {
    return {
      state: false,
      msg: '页数不合法',
    };
  }
}
/**
 * 获取报送的信息
 * @param {*} date
 * @returns
 */
async function getReportNews(date) {
  const gte = dayjs(date).format();
  const lte = dayjs(date).add(1, 'day').format();

  const sort = {
    state: 1,
    reportTime: {
      $gte: gte,
      $lte: lte,
    },
  };
  const option = {
    __v: 0,
    content: 0,
    segmentation: 0,
    time: 0,
    state: 0,
  };

  const data = await ContentModel.find(sort, option)
    .sort({ reportTime: 1 })
    .exec();

  return {
    state: true,
    data,
  };
}

/**
 * 获取新闻全文
 * @param {*} id
 * @returns
 */
async function getNewContent(_id) {
  const { content } = await ContentModel.findOne({ _id });
  if (content) {
    return {
      state: true,
      data: {
        _id,
        content,
      },
    };
  } else {
    return {
      state: false,
      msg: '错误',
    };
  }
}
/**
 * 获取报送的内容
 * @param {*} _id
 * @returns
 */
async function getNewReport(_id) {
  const { report } = await ContentModel.findOne({ _id });
  if (report) {
    return {
      state: true,
      data: {
        _id,
        report,
      },
    };
  } else {
    return {
      state: false,
      msg: '错误',
    };
  }
}
//  updateOne
// {
//   "acknowledged": true,
//   "modifiedCount": 1,
//   "upsertedId": null,
//   "upsertedCount": 0,
//   "matchedCount": 1
// }
/**
 * 修改报送内容
 * @param {*} _id 新闻 id
 * @param {*} report 报送内容
 * @returns
 */
async function updateReport(_id, report) {
  const data = ContentModel.findOneAndUpdate(
    { _id },
    { report },
    { new: true }
  );

  if (data !== null) {
    // 更新成功
    const { report } = data;
    return {
      state: true,
      data: {
        _id,
        report,
      },
    };
  } else {
    // 更新失败
    return { state: false, msg: '_id 不存在' };
  }
}
/**
 * 更新新闻状态
 * @param {*} _id
 * @param {*} state
 * @returns
 */
async function updateNewsState(_id, state) {
  const data = await ContentModel.findOneAndUpdate(
    { _id },
    { state, reportTime: dayjs().format() },
    { new: true }
  );
  console.log(data);
  if (data !== null) {
    const { _id, state } = data;
    return { state: true, data: { _id, state } };
  }
}
/**
 * 删除新闻
 * @param {*} _id
 * @returns
 */
async function deleteNews(_id) {
  const data = await ContentModel.deleteOne({ _id });
  if (data.acknowledged && data.deletedCount > 0) {
    return {
      state: true,
      msg: '删除成功',
    };
  } else {
    return {
      state: false,
      msg: '删除失败',
    };
  }
}

module.exports = {
  addContent,
  getContent,
  getNewContent,
  updateReport,
  updateNewsState,
  deleteNews,
  getNewReport,
  getReportNews,
};

// getReportNews().then((res) => console.log(res));
