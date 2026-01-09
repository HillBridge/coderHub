const Router = require("koa-router");
const userRouter = new Router({
  prefix: "/user",
});
const userController = require("../controller/userController");
const { verifyUser, handlePassword } = require("../middleware/userMiddleware");

userRouter.post(
  "/register",
  verifyUser,
  handlePassword,
  userController.register
);

module.exports = userRouter;
