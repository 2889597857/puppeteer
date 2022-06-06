const getTopURL = url => url.replace(/^https?:\/\/(.*?)(:\d+)?\/.*$/, '$1')
module.exports = { getTopURL }
