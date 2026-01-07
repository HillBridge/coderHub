const Router = require("koa-router");
const userRouter = new Router({
  prefix: "/user",
});
const userController = require("../controller/userController");

userRouter.post("/register", userController.register);

module.exports = userRouter;
