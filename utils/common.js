const getTopURL = (url) => url.replace(/^https?:\/\/(.*?)(:\d+)?\/.*$/, '$1');

/**
 * 验证 _id 是否合法
 * @param {string} id
 * @returns
 */
function verifyID(id) {
  // mongoose.Types.ObjectId.isValid(id)
  return /^[a-fA-F0-9]{24}$/.test(id);
}

module.exports = { getTopURL, verifyID };
