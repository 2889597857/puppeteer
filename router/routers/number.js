const Router = require('express');
const { NewsNumber } = require('../../controllers');

const router = Router();

router.get('/', NewsNumber.getNewsCount);


module.exports = router;
