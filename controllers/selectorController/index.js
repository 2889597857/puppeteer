const linkSelector = require('./link');
const newsSelector = require('./news');
module.exports = Selector = { ...linkSelector, ...newsSelector };
