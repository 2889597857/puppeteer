const Router = require('express')
const { createTask } = require('../../hook')
const { getTaskList } = require('../../controllers/taskController')

const router = Router()

router.get('/', async (req, res) => {
  const type = req.query.type
  if (parseInt(type, 10) && parseInt(type, 10) <= 2) {
    const result = await getTaskList(type)
    res.json({
      code: 200,
      data: result
    })
  }
})

router.post('/link/create', async (req, res) => {
  const { name, description } = req.body
  if (name && description) {
    const result = await createTask(name, description, 0)
    if (result) {
      res.json({
        code: 200,
        data: result
      })
    }
  }
})

router.post('/content/create', async (req, res) => {
  const { name, description } = req.body
  if (name && description) {
    const result = await createTask(name, description, 1)
    if (result) {
      res.json({
        code: 200,
        data: result
      })
    }
  }
})

module.exports = router
