const jwt = require("jsonwebtoken");

const errorType = require("../constants/errorType");
const { comparePassword } = require("../utils/handlePassword");
const { PUBLIC_KEY } = require("../app/config");

const login = async (ctx, next) => {
  const { username, password } = ctx.request.body;

  // 1. 验证用户名和密码是否为空
  if (!username || !password) {
    return ctx.app.emit(
      "error",
      new Error(errorType.USERNAME_OR_PASSWORD_IS_REQUIRED),
      ctx
    );
  }

  // 2. 验证用户名是否存在
  const userService = require("../service/userService");
  try {
    const result = await userService.getUserByUsername(username);

    if (result.length < 1) {
      return ctx.app.emit("error", new Error(errorType.USER_NOT_FOUND), ctx);
    }

    ctx.user = result[0];
  } catch (error) {
    return (ctx.body = {
      code: 500,
      message: error.message,
    });
  }

  await next();
};

const verifyPassword = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  const userService = require("../service/userService");
  try {
    const result = await userService.getPasswordByUsername(username);

    const isPasswordValid = await comparePassword(password, result[0].password);
    if (!isPasswordValid) {
      return ctx.app.emit(
        "error",
        new Error(errorType.PASSWORD_INCORRECT),
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

const verifyToken = async (ctx, next) => {
  const token = ctx.headers.authorization.replace("Bearer ", "");
  if (!token) {
    return ctx.app.emit("error", new Error(errorType.UNAUTHORIZED), ctx);
  }
  try {
    const decoded = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    ctx.user = decoded;
  } catch (error) {
    return ctx.app.emit("error", new Error(errorType.UNAUTHORIZED), ctx);
  }
  await next();
};

module.exports = {
  login,
  verifyPassword,
  verifyToken,
};
