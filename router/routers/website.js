const Router = require('express');
const {
  addWebsite,
  findWebsite,
} = require('../../controllers/websiteController');

const router = Router();

router.get('/', async (req, res) => {
  // contentStart()
  res.json({
    code: 200,
    msg: 'c ',
  });
});

module.exports = router;
