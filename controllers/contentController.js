const ContentModel = require('../models/contentModel');

async function addContent(pageContent) {
  return ContentModel.insertMany([pageContent]);
}
async function getContent(page = 0) {
  const totalCount = await ContentModel.count();
  const totalPages = Math.ceil(totalCount / 50);
  if (page > 0 && page <= totalPages) {
    const data = await ContentModel.find({}, { __v: 0 })
      .sort({ _id: 1 })
      .skip((page - 1) * 50)
      .limit(50)
      .exec();
    return {
      state:true,
      data: {
        currentPage: page,
        totalPages,
        data,
      },
    };
  } else {
    return {
      state:false,
      msg:'页数不合法'
    };
  }
}

module.exports = {
  addContent,
  getContent,
};
