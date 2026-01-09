const Router = require("koa-router");
const authRouter = new Router({
  prefix: "/user",
});
const authController = require("../controller/authController");
const { login, verifyPassword } = require("../middleware/authMiddleware");

authRouter.post("/login", login, verifyPassword, authController.login);

module.exports = authRouter;
