const errorType = require("../constants/errorType");
const commentService = require("../service/commentService");

const verifyCommentPermission = async (ctx, next) => {
  const { commentId } = ctx.request.body;
  const { id: userId } = ctx.user;

  if (!commentId || !userId) {
    return ctx.app.emit("error", new Error(errorType.BAD_REQUEST), ctx);
  }
  // 判断动态是否存在
  try {
    const result = await commentService.checkCommentPermission(commentId);
    if (result.length < 1) {
      return ctx.app.emit("error", new Error(errorType.NO_PERMISSION), ctx);
    }
  } catch (error) {
    return (ctx.body = {
      code: 500,
      message: error.message,
    });
  }
  await next();
};

module.exports = {
  verifyCommentPermission,
};
