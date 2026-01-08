const errorType = require("../constants/errorType");

const verifyUser = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  if (!username || !password) {
    return ctx.app.emit(
      "error",
      new Error(errorType.USERNAME_OR_PASSWORD_IS_REQUIRED),
      ctx
    );
  }
  await next();
};

module.exports = {
  verifyUser,
};
