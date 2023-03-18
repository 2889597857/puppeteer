const { CronJob } = require('cron');

// *秒 *分 *时 *天 *月 *周
// 0 30 3 * * *  时间模式(每天早上 3 点 30 分： 0 30 3 * * *)

const time = '*/10 * * * * *';

const cron = new CronJob(
  time,
  () => {
    console.log(123);
  },
  () => {
    console.log(456);
  },
  true,
  'Asia/Shanghai'
);

cron.stop