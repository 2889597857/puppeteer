const WebsiteModel = require('../../models/websiteModel');
const ContentModel = require('../../models/ContentModel');
const TaskModel = require('../../models/TaskModel');

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
  for (let index = 0; index < info.length; index += 2) {
    const next = info[index + 1];
    if (next && e.type !== next.type) {
      if (e.count !== next.success) {
        console.log(index);
        // console.log(info[i - 1]);
        // console.log(e);
        // console.log(next);
        // console.log('-----------------');
      }
    }
  }

  // info.forEach((e, i) => {
  //   const next = info[i + 1];
  //   if (next && e.type == next.type) {
  //   } else if (next && e.type !== next.type) {
  //     if (e.count !== next.success) {
  //       console.log(i);
  //       // console.log(info[i - 1]);
  //       // console.log(e);
  //       // console.log(next);
  //       // console.log('-----------------');
  //     }
  //   }
  // });
  console.log(123);
}
task();

// 375
// { _id: new ObjectId("639fed61259fd89f5a840a29"), type: 1 }
// { _id: new ObjectId("639fed40259fd89f5a84090d"), type: 0 }
// { _id: new ObjectId("639eccd3259fd89f5a840840"), type: 0 }
// -----------------
// 429
// { _id: new ObjectId("638e9711783f2a3674f3a707"), type: 0 }
// { _id: new ObjectId("638db0cc15bbd7e1cc8f39e2"), type: 1 }
// { _id: new ObjectId("638db08e9f81588a5ad4a437"), type: 1 }
// -----------------
// 430
// { _id: new ObjectId("638db0cc15bbd7e1cc8f39e2"), type: 1 }
// { _id: new ObjectId("638db08e9f81588a5ad4a437"), type: 1 }
// { _id: new ObjectId("638db020d7df4db9d009ac83"), type: 1 }
// -----------------
// 431
// { _id: new ObjectId("638db08e9f81588a5ad4a437"), type: 1 }
// { _id: new ObjectId("638db020d7df4db9d009ac83"), type: 1 }
// { _id: new ObjectId("638da15be56908a27d5a3e92"), type: 1 }
// -----------------
// 435
// { _id: new ObjectId("638d436e41b6ea3aa8d15a88"), type: 1 }
// { _id: new ObjectId("638d435c41b6ea3aa8d15a08"), type: 0 }
// { _id: new ObjectId("638d41cb3aebd2f25c3781b4"), type: 0 }
// -----------------
// 436
// { _id: new ObjectId("638d435c41b6ea3aa8d15a08"), type: 0 }
// { _id: new ObjectId("638d41cb3aebd2f25c3781b4"), type: 0 }
// { _id: new ObjectId("638d3e141f786d15997fc65c"), type: 0 }
// -----------------
// 437
// { _id: new ObjectId("638d41cb3aebd2f25c3781b4"), type: 0 }
// { _id: new ObjectId("638d3e141f786d15997fc65c"), type: 0 }
// { _id: new ObjectId("638cb93d639bb53e170ed36f"), type: 0 }
// -----------------
// 438
// { _id: new ObjectId("638d3e141f786d15997fc65c"), type: 0 }
// { _id: new ObjectId("638cb93d639bb53e170ed36f"), type: 0 }
// { _id: new ObjectId("638cb45861bef7ccfe22babd"), type: 0 }
// -----------------
// 563
// { _id: new ObjectId("6365af201f786d15997f5be0"), type: 1 }
// { _id: new ObjectId("6365af191f786d15997f5af7"), type: 0 }
// { _id: new ObjectId("6364c4071f786d15997f5a63"), type: 0 }
// -----------------
// 716
// { _id: new ObjectId("63423e84df3033f8c4f62de3"), type: 1 }
// { _id: new ObjectId("63423bc54f7d385b9afb2a38"), type: 0 }
// { _id: new ObjectId("63422377f9913b70168e1b26"), type: 0 }
// -----------------
// 721
// { _id: new ObjectId("6341409c8a1afb305fdbef4d"), type: 1 }
// { _id: new ObjectId("634140898a1afb305fdbeecd"), type: 0 }
// { _id: new ObjectId("63413f564e40f53419e861ff"), type: 0 }
// -----------------
// 722
// { _id: new ObjectId("634140898a1afb305fdbeecd"), type: 0 }
// { _id: new ObjectId("63413f564e40f53419e861ff"), type: 0 }
// { _id: new ObjectId("63413bc72e687038d35f8d8f"), type: 0 }
// -----------------
// 723
// { _id: new ObjectId("63413f564e40f53419e861ff"), type: 0 }
// { _id: new ObjectId("63413bc72e687038d35f8d8f"), type: 0 }
// { _id: new ObjectId("63413b56f9fa1b91bfda951e"), type: 0 }
// -----------------
// 744
// { _id: new ObjectId("6338d758904221a0ed5665aa"), type: 1 }
// { _id: new ObjectId("6338d73c21430dd423164df0"), type: 0 }
// { _id: new ObjectId("6338d73c21430dd423164dee"), type: 0 }
// -----------------
// 754
// { _id: new ObjectId("63369ddd897df0341e5e9d3b"), type: 0 }
// { _id: new ObjectId("63369bc054894d9375997f49"), type: 1 }
// { _id: new ObjectId("63369bc054894d9375997f45"), type: 1 }
// -----------------
// 755
// { _id: new ObjectId("63369bc054894d9375997f49"), type: 1 }
// { _id: new ObjectId("63369bc054894d9375997f45"), type: 1 }
// { _id: new ObjectId("63369bbf54894d9375997f3e"), type: 1 }
// -----------------
// 756
// { _id: new ObjectId("63369bc054894d9375997f45"), type: 1 }
// { _id: new ObjectId("63369bbf54894d9375997f3e"), type: 1 }
// { _id: new ObjectId("63369bbd54894d9375997f37"), type: 1 }
// -----------------
// 757
// { _id: new ObjectId("63369bbf54894d9375997f3e"), type: 1 }
// { _id: new ObjectId("63369bbd54894d9375997f37"), type: 1 }
// { _id: new ObjectId("63369bb154894d9375997f28"), type: 1 }
// -----------------
// 761
// { _id: new ObjectId("6336585ce71ffdf895f4c61e"), type: 1 }
// { _id: new ObjectId("63365847e71ffdf895f4c58e"), type: 0 }
// { _id: new ObjectId("63363fade71ffdf895f4c50c"), type: 0 }
// -----------------
