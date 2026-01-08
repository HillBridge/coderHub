const Router = require("koa-router");
const userRouter = new Router({
  prefix: "/user",
});
const userController = require("../controller/userController");
const { verifyUser } = require("../middleware/userMiddleware");

userRouter.post("/register", verifyUser, userController.register);

module.exports = userRouter;
