const {
  start: contentStart,
  createTasks: createContentTasks,
} = require('./content');

const { start: linksStart, createTasks: createLinkTasks } = require('./link');

const { executeAsyncTask } = require('../utils');

function taskInfo() {
  return {
    time: 0,
    count: 0,
    success: 0,
    failed: 0,
  };
}

async function startExecuteTask(type) {
  const createTasksFN = type == 0 ? createLinkTasks : createContentTasks;
  
}

module.exports = { contentStart, linksStart };
contentStart();
