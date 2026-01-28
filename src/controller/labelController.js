const labelService = require("../service/labelService");

class LabelController {
  async create(ctx, next) {
    // 获取请求
    const { name } = ctx.request.body;

    // 数据库操作
    try {
      await labelService.createLabel({ name });
      ctx.body = {
        code: 200,
        message: "创建标签成功",
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        message: error.message,
      };
    }
  }

  async list(ctx, next) {
    const { pageNum = 1, pageSize = 10 } = ctx.query;

    if (pageNum <= 0 || pageSize <= 0) {
      return ctx.app.emit("error", new Error(errorType.BAD_REQUEST), ctx);
    }
    try {
      const result = await labelService.getLabelList({ pageNum, pageSize });
      ctx.body = {
        code: 200,
        message: "获取标签列表成功",
        data: result,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        message: error.message,
      };
    }
  }
}

module.exports = new LabelController();
