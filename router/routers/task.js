const Router = require('express');
const { createTask } = require('../../middlewares');
const {
  getTaskList,
  getExecutingTask,
} = require('../../controllers/taskController');

const router = Router();

router.get('/', async (req, res) => {
  /** type 任务类型  0 链接任务 1 内容任务 2 全部 */
  const type = req.query.type;
  await getTaskList(type);
});

router.get('/create', async (req, res) => {
  const type = req.query.type;
  const result = await createTask(type);
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
    res.json({ code: 201, msg: '有任务正在执行中' });
  }
});

module.exports = router;
