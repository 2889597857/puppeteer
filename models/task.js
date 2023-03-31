const mongoose = require('../config/mongoose');

const TaskSchema = mongoose.Schema({
  /** 创建时间 */
  creationTime: Date,
  /** 任务数量 */
  count: Number,
  /** 任务成功数量 */
  success: Number,
  /** 任务失败数量 */
  failed: Number,
  /** 任务结果  */
  result: Number,
  /** 任务状态 0 正在执行 1 执行结束 */
  state: Number,
  /** 任务类型 0 获取链接 1 获取内容 */
  type: Number,
  /** 耗时 */
  elapsedTime: Number,
});

const TaskModel = mongoose.model('TaskSchema', TaskSchema, 'task');

module.exports = TaskModel;
