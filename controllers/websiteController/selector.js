const WebsiteModel = require('../../models/websiteModel');
const { getTopURL, verifyID, message } = require('../../utils');

async function addSelector(req, res) {
  const {} = req.query;
}
async function addLinkSelector(req, res) {}
async function addPageSelector(req, res) {
  const { _id, selector } = req.body;
  try {
    if (!verifyID(_id)) throw new Error('_id is wrong');
    const data = await WebsiteModel.findByIdAndUpdate(
      _id,
      {
        $push: { pageSelector: { ...selector } },
      },
      { new: true }
    );
    res.json({ code: 200 });
  } catch (error) {
    res.json({ error:error.message  });
  }
}

module.exports = {
  addSelector,
  addLinkSelector,
  addPageSelector,
};
