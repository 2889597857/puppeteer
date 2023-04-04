const Router = require('express');
const Task = require('../../controllers/taskController');

const router = Router();

router.get('/new', Task.findNewTask);

router.get('/all', Task.findAllTask);

router.get('/start', Task.createTask);

module.exports = router;
