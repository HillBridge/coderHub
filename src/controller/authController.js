class AuthController {
  async login(ctx, next) {
    ctx.body = {
      code: 200,
      message: "登录成功",
    };
  }
}

module.exports = new AuthController();
