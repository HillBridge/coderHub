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

  async reply(ctx, next) {
    const { id: userId } = ctx.user;
    const { content, momentId, commentId } = ctx.request.body;

    if (!content || !momentId || !commentId) {
      return ctx.app.emit("error", new Error(errorType.BAD_REQUEST), ctx);
    }

    try {
      await commentService.reply({ userId, momentId, commentId, content });
      ctx.body = {
        code: 200,
        message: "回复评论成功!!",
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        message: error.message,
      };
    }
  }

  async update(ctx, next) {
    const { commentId, content } = ctx.request.body;
    if (!commentId || !content) {
      return ctx.app.emit("error", new Error(errorType.BAD_REQUEST), ctx);
    }

    try {
      await commentService.update({ commentId, content });
      ctx.body = {
        code: 200,
        message: "更新评论成功!!",
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
