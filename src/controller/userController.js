const userService = require("../service/userService");

class UserController {
  async register(ctx, next) {
    // 获取请求
    const { username, password } = ctx.request.body;

    // 数据库操作
    try {
      await userService.createUser({ username, password });
      ctx.body = {
        code: 200,
        message: "用户注册成功",
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        message: error.message,
      };
    }
  }
}

module.exports = new UserController();
