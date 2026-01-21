const Router = require("koa-router");
const momentRouter = new Router({
  prefix: "/moment",
});
const momentController = require("../controller/momentController");
const { verifyToken } = require("../middleware/authMiddleware");
const { verifyPermission } = require("../middleware/permissionMiddleware");

momentRouter.post("/create", verifyToken, momentController.create);

momentRouter.get("/detail/:id", verifyToken, momentController.detail);

momentRouter.get("/list", verifyToken, momentController.list);

momentRouter.patch(
  "/update",
  verifyToken,
  verifyPermission,
  momentController.update
);

module.exports = momentRouter;
