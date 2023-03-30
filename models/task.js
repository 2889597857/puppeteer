const mongoose = require('../config/mongoose');

const TaskSchema = mongoose.Schema({
  /** 创建时间 */
  creationTime: Date,

  link: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'website',
  },
  /** 任务数量 */
  count: Number,
  /** 任务成功数量 */
  success: Number,
  /** 任务失败数量 */
  failed: Number,
  /** 耗时 */
  elapsedTime: Number,
});

const TaskModel = mongoose.model('TaskSchema', TaskSchema, 'task');

module.exports = TaskModel;
