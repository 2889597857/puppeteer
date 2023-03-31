const Router = require('express');
const { NewsNumber } = require('../../controllers');

const router = Router();

router.get('/', NewsNumber.changeAllState);
router.get('/switch/site', NewsNumber.changeSiteState);
router.get('/switch/link', NewsNumber.changeLinkState);
router.get('/test/link', NewsNumber.testLink);

module.exports = router;
