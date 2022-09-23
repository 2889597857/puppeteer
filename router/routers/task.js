const Router = require('express');
const { createTask } = require('../../hook');
const {
  getTaskList,
  getExecutingTask,
} = require('../../controllers/taskController');

const router = Router();

router.get('/', async (req, res) => {
  /** type 任务类型 0 全部 1 链接任务 2内容任务 */
  const type = req.query.type;
  getTaskList(type);
});

router.post('/link/create', async (req, res) => {
  const result = await createTask(0);
  if (result) {
    const { _id } = result;
    // console.log(_id);
    if (result) {
      res.json({
        code: 200,
        data: result,
      });
    }
  } else {
    res.json({ code: 200, msg: '任务正在执行中' });
  }
});

router.post('/content/create', async (req, res) => {
  const { name, description } = req.body;
  if (name && description) {
    const result = await createTask(name, description, 1);
    if (result) {
      res.json({
        code: 200,
        data: result,
      });
    }
  } else res.sendStatus(404);
});

module.exports = router;
