const errorTypes = require("../constants/errorType");

const errorHandler = (err, ctx) => {
  console.error("错误信息", err.message);
  let status = 200;
  let code = 500;
  let message = "NOT FOUND";
  switch (err.message) {
    case errorTypes.USERNAME_OR_PASSWORD_IS_REQUIRED:
      message = "用户名或密码不能为空";
      break;
    case errorTypes.USER_ALREADY_EXISTS:
      message = "用户已存在";
      break;
    case errorTypes.USER_NOT_FOUND:
      message = "用户不存在";
      break;
    case errorTypes.PASSWORD_INCORRECT:
      message = "密码不正确";
      break;
    case errorTypes.UNAUTHORIZED:
      message = "未授权";
      break;
    case errorTypes.BAD_REQUEST:
      message = "请求错误";
      break;
    default:
      status = 404;
      break;
  }
  ctx.status = status;
  ctx.body = {
    code,
    message,
  };
};

module.exports = errorHandler;
