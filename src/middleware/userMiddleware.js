const errorType = require("../constants/errorType");
const { encryptPassword } = require("../utils/handlePassword");

const verifyUser = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  // 1. 验证用户名和密码是否为空
  if (!username || !password) {
    return ctx.app.emit(
      "error",
      new Error(errorType.USERNAME_OR_PASSWORD_IS_REQUIRED),
      ctx
    );
  }

  // 2. 验证用户名是否已存在
  const userService = require("../service/userService");
  try {
    const result = await userService.getUserByUsername(username);
    if (result.length > 0) {
      return ctx.app.emit(
        "error",
        new Error(errorType.USER_ALREADY_EXISTS),
        ctx
      );
    }
  } catch (error) {
    return (ctx.body = {
      code: 500,
      message: error.message,
    });
  }

  await next();
};

const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  const encryptedPassword = await encryptPassword(password);
  ctx.request.body.password = encryptedPassword;
  await next();
};

module.exports = {
  verifyUser,
  handlePassword,
};
