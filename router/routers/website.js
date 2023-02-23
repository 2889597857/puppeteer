const Router = require('express');
const Website = require('../../controllers/websiteController')

const router = Router();

router.get('/',Website.getWebsite);
router.get('/findName',Website.findWebsiteName);
router.post('/addLink',Website.addWebsite);

module.exports = router;
