const website = require('./routers/website');
const link = require('./routers/link');
const task = require('./routers/task');
const news = require('./routers/news');
const pool = {
  pro: null,
  res: null,
  rej: null,
};
const xxxApi = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(Math.random()), 1000);
  });
};
const get = async () => {
  if (pool.pro) {
    return await pool.pro;
  }
  pool.pro = new Promise((resolve, reject) => {
    pool.res = resolve;
    pool.rej = reject;
  });
  try {
    pool.res(await xxxApi());
  } catch (error) {
    pool.rej(error);
  } finally {
    pool.pro = null;
    pool.res = null;
    pool.rej = null;
  }
};

for (let index = 0; index < 99; index++) {
  (async () => console.log(await get()))();
}

module.exports = (app) => {
  app.use('/site', website);
  app.use('/news', news);
  app.use('/task', task);
  // app.use('/link', link)
};
