const urlRegExp = (url) =>
  /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/.test(
    url
  );
const getTopURL = (url) =>
  urlRegExp.test(url)
    ? url.replace(/(^https?:\/\/.*?)(:\d+)?\/.*$/, '$1')
    : false;
/**
 * 验证 _id 是否合法
 * @param {string} id
 * @returns
 */
function verifyID(id) {
  // mongoose.Types.ObjectId.isValid(id)
  return /^[a-fA-F0-9]{24}$/.test(id);
}

module.exports = { getTopURL, verifyID,urlRegExp };
