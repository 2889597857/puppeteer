const Router = require('express');
const Website = require('../../controllers/websiteController');

const router = Router();

router.get('/get/info', Website.getWebsite);
router.get('/get/selector', Website.getAllPageSelector);
router.get('/get/name', Website.findWebsiteAllName);
router.get('/find/info', Website.findSiteInfoByID);
router.get('/find/link', Website.findWebsiteLink);
router.get('/find/name', Website.findWebsiteName);
router.post('/add/link', Website.addWebsite);
router.post('/add/selector', Website.addSelector);
router.post('/add/selector/link', Website.addSelector);
router.post('/add/selector/page', Website.addPageSelector);

module.exports = router;
