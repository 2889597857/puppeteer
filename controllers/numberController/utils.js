const WebsiteModel = require('../../models/websiteModel');
const ContentModel = require('../../models/contentModel');
const TaskModel = require('../../models/taskModel');
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

// async function a() {
//   const sites = WebsiteModel.find({}, { _id: 1, url: 1 });

//   for await (const site of sites) {
//     console.log(site.url);
//     const url = site.url.slice(8);
//     await ContentModel.updateMany(
//       { url: { $regex: url }, website: { $eq: null } },
//       {
//         website: site._id,
//       }
//     );
//   }
// }

async function task() {
  // const info = await TaskModel.find({}).sort({ _id: -1 });
  // for (let index = 0; index < info.length; index += 2) {
  //   const next = info[index + 1];
  //   const current = info[index];
  //   const elapsedTime = current.elapsedTime + next.elapsedTime;
  //   const completed = +next.creationTime + elapsedTime;
  //   a.push({
  //     time: dayjs(next.creationTime).format(),
  //     count: current.count,
  //     success: current.success,
  //     failed: current.failed,
  //     elapsedTime,
  //     completed: dayjs(completed).format(),
  //     site: 3,
  //   });
  // }
  // fs.writeFileSync('./b.json', JSON.stringify(a));
  // const a = fs.readFileSync('./b.json');
  // await TaskModel.insertMany(JSON.parse(a));
  // console.log(12);
}
