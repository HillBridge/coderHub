const errorTypes = require("../constants/errorType");

const errorHandler = (err, ctx) => {
  console.error("错误信息", err.message);
  let status = 404;
  let code = 500;
  let message = "NOT FOUND";
  switch (err.message) {
    case errorTypes.USERNAME_OR_PASSWORD_IS_REQUIRED:
      status = 200;
      message = "用户名或密码不能为空";
      break;
  }
  ctx.status = status;
  ctx.body = {
    code,
    message,
  };
};

module.exports = errorHandler;
