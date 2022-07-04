const dayjs = require('dayjs');
const ContentModel = require('../models/contentModel');

async function addContent(pageContent) {
  return ContentModel.insertMany([pageContent]);
}
async function getContent(page = 0) {
  const totalCount = await ContentModel.count();
  const totalPages = Math.ceil(totalCount / 50);
  if (page > 0 && page <= totalPages) {
    const data = await ContentModel.find(
      { isReported: false },
      { __v: 0, isReported: 0, content: 0 }
    )
      .sort({ time: -1 })
      .skip((page - 1) * 50)
      .limit(50)
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

async function getNewContent(id) {
  const { content } = await ContentModel.findOne({ _id: id });
  if (content) {
    return {
      state: true,
      data: {
        _id: id,
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

async function getNewReport(id) {
  const { report } = await ContentModel.findOne({ _id: id });
  if (report) {
    return {
      state: true,
      data: {
        _id: id,
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

async function updateReport(_id, report) {
  const data = await ContentModel.updateOne({ _id }, { report });
  if (data.acknowledged) {
    // 值是否更新，相同值不更新
    if (data.modifiedCount > 0) {
      const { report: newReport } = await getNewReport(_id);
      return {
        state: true,
        data: {
          _id,
          report: newReport.report,
        },
      };
    } else {
      return {
        state: true,
        data: {
          _id,
          report,
        },
      };
    }
  } else {
    return { state: false, msg: '_id 不存在' };
  }
}

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
  deleteNews,
};
