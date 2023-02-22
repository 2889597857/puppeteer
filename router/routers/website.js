const Router = require('express');
const Website = require('../../controllers/website/websiteController')

const router = Router();

router.get('/',Website.getWebsite);
router.post('/add',Website.addWebsite);

module.exports = router;
