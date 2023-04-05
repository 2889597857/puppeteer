const Router = require('express');
const { NewsNumber } = require('../../controllers');

const router = Router();

router.get('/news', NewsNumber.getNewsCount);
router.get('/news/base', NewsNumber.base);
router.get('/task', NewsNumber.task);


module.exports = router;
