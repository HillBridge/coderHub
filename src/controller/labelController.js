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
}

module.exports = new LabelController();
