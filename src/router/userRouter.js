const Router = require("koa-router");
const userRouter = new Router({
  prefix: "/user",
});
const userController = require("../controller/userController");
const fileController = require("../controller/fileController");
const { verifyUser, handlePassword } = require("../middleware/userMiddleware");

userRouter.post(
  "/register",
  verifyUser,
  handlePassword,
  userController.register
);

userRouter.get("/avatar/:userId", fileController.getAvatarInfo);

module.exports = userRouter;
