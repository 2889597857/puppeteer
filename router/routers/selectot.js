const Router = require('express');
const router = Router();
const Selector = require('../../controllers/selectorController');

router.get('/', Selector.getSelectorList);

router.get('/getSelector', Selector.getSelector);

router.get('/report', Selector.getReportSelector);

router.get('/details', Selector.getSelectorDetails);

router.post('/updateSelectorState', Selector.updateSelectorState);

router.post('/updateReportTime', Selector.updateReportTime);

router.post('/updateReport', Selector.updateReport);

module.exports = router;
