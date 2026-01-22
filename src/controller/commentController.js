const commentService = require("../service/commentService");
const errorType = require("../constants/errorType");

class CommentController {
  async create(ctx, next) {
    // 获取内容
    const { id: userId } = ctx.user;
    const { content, momentId } = ctx.request.body;

    if (!content || !momentId) {
      return ctx.app.emit("error", new Error(errorType.BAD_REQUEST), ctx);
    }

    // 数据库操作
    try {
      await commentService.create({ userId, momentId, content });
      ctx.body = {
        code: 200,
        message: "创建评论成功!!",
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        message: error.message,
      };
    }
  }
}

module.exports = new CommentController();
