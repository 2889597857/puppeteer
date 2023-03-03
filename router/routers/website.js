const Router = require('express');
const Website = require('../../controllers/websiteController')

const router = Router();

router.get('/info',Website.getWebsite);
router.get('/selector',Website.getAllPageSelector);
router.get('/find/name',Website.findWebsiteName);
router.get('/find/name/all',Website.findWebsiteAllName);
router.get('/find/link',Website.findWebsiteLink);
router.post('/add/link',Website.addWebsite);
router.post('/add/selector',Website.addSelector);
router.post('/add/selector/link',Website.addSelector);
router.post('/add/selector/page',Website.addPageSelector);

module.exports = router;
