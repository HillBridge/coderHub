const Router = require("koa-router");
const momentRouter = new Router({
  prefix: "/moment",
});
const momentController = require("../controller/momentController");
const { verifyToken } = require("../middleware/authMiddleware");

momentRouter.post("/create", verifyToken, momentController.create);

momentRouter.get("/detail/:id", verifyToken, momentController.detail);

module.exports = momentRouter;
