const userService = require("../service/userService");

class UserController {
  async register(ctx, next) {
    // 获取请求
    const userInfo = ctx.request.body;

    // if (!userInfo.username || !userInfo.password) {
    //   return (ctx.body = {
    //     code: 400,
    //     message: "用户名或密码不能为空",
    //   });
    // }

    // 数据库操作
    try {
      await userService.createUser(userInfo);
      ctx.body = {
        code: 200,
        message: "注册成功",
      };
    } catch (error) {
      return (ctx.body = {
        code: 500,
        message: error.message,
      });
    }
  }
}

module.exports = new UserController();
