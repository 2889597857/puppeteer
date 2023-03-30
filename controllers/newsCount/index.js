const WebsiteModel = require('../../models/websiteModel');
const ContentModel = require('../../models/ContentModel');
const TaskModel = require('../../models/TaskModel');

const fs = require('fs');

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

async function task() {
  const info = await TaskModel.find({}).sort({ _id: -1 });
  let a = [];
  for (let index = 0; index < info.length; index += 2) {
    const current = info[index];
    const next = info[index + 1];

    a.push({
      count: current.count,
      success: current.success,
      failed: current.failed,
      elapsedTime: current.elapsedTime,
    });
  }
  a = JSON.stringify(a);
  const data = fs.writeFileSync('a.txt', a, (e) => {
    console.log(e);
  });
  console.log(data);
}
// task();
let a1 = fs.readFileSync('./a.json');
console.log(JSON.parse(a1));
