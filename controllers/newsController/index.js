const commonNews = require('./common');
const reportNews = require('./report');
module.exports = { ...commonNews, ...reportNews };
