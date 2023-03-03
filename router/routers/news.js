const Router = require('express');
const router = Router();
const { News } = require('../../controllers');

router.get('/', News.getNewsList);
router.get('/crawler', News.crawlerNews);
router.get('/report', News.getReportNews);
router.get('/details', News.getNewsDetails);
router.post('/update/state', News.updateNewsState);
router.post('/update/time', News.updateReportTime);
router.post('/update/content', News.updateReportContent);
module.exports = router;
