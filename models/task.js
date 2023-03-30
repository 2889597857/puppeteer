const mongoose = require('../config/mongoose');

const TaskSchema = mongoose.Schema({
  /** 创建时间 */
  creationTime: Date,
  linkFailed: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'website',
    },
  ],
  /** 链接数量 */
  count: Number,
  /** 内容数量 */
  success: Number,
  /** 失败数量 */
  failed: Number,
  /** 耗时 */
  elapsedTime: Number,
});

const TaskModel = mongoose.model('TaskSchema', TaskSchema, 'task');

module.exports = TaskModel;
