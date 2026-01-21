const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../app/config");

class AuthController {
  async login(ctx, next) {
    const { id, username } = ctx.user;
    const token = jwt.sign({ id, username }, PRIVATE_KEY, {
      expiresIn: "1d",
      algorithm: "RS256",
    });
    ctx.body = {
      token,
      code: 200,
      message: "登录成功",
    };
  }
}

module.exports = new AuthController();
