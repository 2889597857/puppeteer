const { addTask } = require('../controllers/taskController')
const dayjs = require('dayjs')

async function createTask (name, description, type) {
  const result = await addTask({
    name,
    description,
    creationTime: dayjs().format(),
    type
  })
  const { _id, name: taskName, description: desc, creationTime } = result[0]
  return { _id, taskName, desc, creationTime }
}

module.exports = { createTask }
