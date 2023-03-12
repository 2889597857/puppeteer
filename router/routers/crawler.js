const Router = require('express');
const { Crawler } = require('../../controllers');

const router = Router();

router.get('/switch', Crawler.changeAllState);
router.get('/switch/site', Crawler.formatChangeParams, Crawler.changeSiteState);
router.get('/switch/link', Crawler.formatChangeParams, Crawler.changeLinkState);
router.get('/test/link', Crawler.formatChangeParams, Crawler.testLink);

module.exports = router;
