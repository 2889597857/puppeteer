const WebsiteModel = require('../../models/websiteModel');
const ContentModel = require('../../models/ContentModel');
const TaskModel = require('../../models/TaskModel');
const fs = require('fs');
const dayjs = require('dayjs');

async function getNewsCount() {
  const sites = await WebsiteModel.find({}, { _id: 1, name: 1 });
  const countInfo = [];
  for await (const site of sites) {
    const count = await ContentModel.count({ website: site._id });
    const report = await ContentModel.count({ website: site._id, state: 1 });
    countInfo.push({ _id: site._id, name: site.name, count, report });
  }
  return countInfo;
}
// getNewsCount().then((res) => console.log(res));

module.exports = {
  getNewsCount,
};
