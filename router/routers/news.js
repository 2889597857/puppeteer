const Router = require('express');
const router = Router();
const { News } = require('../../controllers');

router.get('/', News.getNewsList);
router.get('/getNews', News.getNews);
router.get('/report', News.getReportNews);
router.get('/details', News.getNewsDetails);
router.post('/updateNewsState', News.updateNewsState);
router.post('/updateReportTime', News.updateReportTime);
router.post('/updateReportContent', News.updateReportContent);
module.exports = router;
