const TaskModel = require('../models/taskModel');
const {
  createTypeTask,
  executeTask,
  startTask,
  createAndExecuteTypeTask,
} = require('../../middlewares');

const {
  addTask,
  getTaskList,
  getExecutingTask,
  updateTaskInfo,
} = require('./controller');

async function createTask(req, res) {
  const { _id, creationTime, taskFN } = await createTypeTask(0);
  startTask(_id, taskFN);
  res.json({
    code: 200,
    data: {
      _id,
      creationTime,
    },
  });
}

async function createTask(req, res) {
  const { _id, creationTime, taskFN } = await getExecutingTask(null);
}

module.exports = {
  createTask,
  addTask,
  getTaskList,
  getExecutingTask,
  updateTaskInfo,
};
