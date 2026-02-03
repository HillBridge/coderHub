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

userRouter.get("/avatar/:userId", userController.getAvatarInfo);

module.exports = userRouter;
