const Router = require("koa-router");
const authRouter = new Router({
  prefix: "/user",
});
const authController = require("../controller/authController");
const {
  login,
  verifyPassword,
  verifyToken,
} = require("../middleware/authMiddleware");

authRouter.post("/login", login, verifyPassword, authController.login);

authRouter.post("/test", verifyToken, authController.success);

module.exports = authRouter;
