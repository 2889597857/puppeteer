const WebsiteModel = require('../../models/websiteModel');
const ContentModel = require('../../models/contentModel');
const TaskModel = require('../../models/taskModel');
const fs = require('fs');
const dayjs = require('dayjs');

async function getNewsCount(req, res) {
  const sites = await WebsiteModel.find({}, { _id: 1, name: 1 });
  const countInfo = [];
  for await (const site of sites) {
    const count = await ContentModel.count({ website: site._id });
    const report = await ContentModel.count({ website: site._id, state: 1 });
    countInfo.push({ _id: site._id, name: site.name, count, report });
  }

  res.json({
    code: 200,
    data: countInfo,
  });
}

module.exports = {
  getNewsCount,
};
