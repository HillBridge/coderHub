const errorType = require("../constants/errorType");
const momentService = require("../service/momentService");

const verifyMomentPermission = async (ctx, next) => {
  const { momentId } = ctx.request.body;
  const { id: userId } = ctx.user;

  if (!momentId || !userId) {
    return ctx.app.emit("error", new Error(errorType.BAD_REQUEST), ctx);
  }
  try {
    const result = await momentService.checkMomentPermission(momentId, userId);
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
  verifyMomentPermission,
};
