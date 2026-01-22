const Router = require("koa-router");
const commentRouter = new Router({
  prefix: "/comment",
});
const commentController = require("../controller/commentController");
const { verifyToken } = require("../middleware/authMiddleware");
const { verifyPermission } = require("../middleware/commentMiddleware");

commentRouter.post(
  "/create",
  verifyToken,
  verifyPermission,
  commentController.create
);

commentRouter.post(
  "/reply",
  verifyToken,
  verifyPermission,
  commentController.reply
);

commentRouter.patch("/update", verifyToken, commentController.update);

module.exports = commentRouter;
