function app (time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(time)
      resolve()
    }, time * 1000)
  })
}
let a = [4, 3, 2, 1]

async function a1 () {
  console.time('a1')
  for await (const item of a) {
    app(item)
    console.log(item.toString() + '-----------')
  }
  console.timeEnd('a1')
}
a1()
const taskQueue = [...AsyncTasks]

await Promise.all(
  new Array().fill(null).map(async () => {
    let curr
    while ((curr = taskQueue.pop())) {
      await curr
    }
  })
)
// let add = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// while ((curr = add.pop())) {
//   console.log(curr)
// }
// console.log(add)
// https://qiita.com/tonio0720/items/6f9319e4cce53256b4c9

// async function verySlowAsync(index) {
//     console.time('execute');
//     return new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));
// }

// async function verySlowAsync(index) {
//     console.log(index);
//     return new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));
// }

// async function execute() {

//     console.time('execute');

//     const INIT = 0;
//     const MAX = 100;

//     for (let index = INIT; index < MAX; index++) {
//         await verySlowAsync(index);
//     }

//     console.timeEnd('execute');

// }

// execute();

// async function execute() {

//     console.time('execute');

//     const INIT = 0;
//     const MAX = 100;
//     const CONCURRENCY = 10; // 同時実行できる数を定義

//     let cnt = INIT;
//     let promises = [];

//     for (let i = 0; i < CONCURRENCY; i++) {

//         let p = new Promise((resolve) => {

//             (async function loop(index) {

//                 if (index < MAX) {
//                     await verySlowAsync(index);
//                     loop(cnt++);
//                     return;
//                 }

//                 resolve();

//             })(cnt++);

//         });

//         promises.push(p);

//     }

//     await Promise.all(promises);

//     console.timeEnd('execute');

// }

// execute();
