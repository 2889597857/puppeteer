const Router = require('express');
const { NewsNumber } = require('../../controllers');

const router = Router();

router.get('/', NewsNumber.getNewsCount);
router.get('/task', NewsNumber.task);


module.exports = router;
