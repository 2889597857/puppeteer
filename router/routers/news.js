const Router = require('express');
const router = Router();
const News = require('../../controllers/newsController');

router.get('/', News.getNewsList);

router.get('/getNews', News.getNews);

router.get('/report', News.getReportNews);

router.get('/details', News.getNewsDetails);

router.post('/updateNewsState', News.updateNewsState);

router.post('/updateReportTime', News.updateReportTime);

router.post('/updateReport', News.updateReport);

module.exports = router;
