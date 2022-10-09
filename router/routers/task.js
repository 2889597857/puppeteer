const Router = require('express');
const Task = require('../../controllers/taskController');

const router = Router();

router.get('/', Task.findTask);

router.get('/create', Task.createTask);

module.exports = router;
