const Router = require("koa-router");
const momentRouter = new Router({
  prefix: "/moment",
});
const momentController = require("../controller/momentController");
const { verifyToken } = require("../middleware/authMiddleware");
const { verifyMomentPermission } = require("../middleware/momentMiddleware");

momentRouter.post("/create", verifyToken, momentController.create);

momentRouter.get("/detail/:id", verifyToken, momentController.detail);

momentRouter.get("/list", verifyToken, momentController.list);

momentRouter.patch(
  "/update",
  verifyToken,
  verifyMomentPermission,
  momentController.update
);

momentRouter.delete(
  "/delete",
  verifyToken,
  verifyMomentPermission,
  momentController.remove
);

module.exports = momentRouter;
