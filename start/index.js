const { start: contentStart } = require('./content');
const { start: linksStart } = require('./link');
module.exports = { contentStart, linksStart };

// .then(() => contentStart());
contentStart()
// linksStart()