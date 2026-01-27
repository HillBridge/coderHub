const Router = require("koa-router");
const commentRouter = new Router({
  prefix: "/comment",
});
const commentController = require("../controller/commentController");
const { verifyToken } = require("../middleware/authMiddleware");
const { verifyCommentPermission } = require("../middleware/commentMiddleware");
const { verifyMomentPermission } = require("../middleware/momentMiddleware");

commentRouter.post(
  "/create",
  verifyToken,
  verifyMomentPermission,
  commentController.create
);

commentRouter.post(
  "/reply",
  verifyToken,
  verifyMomentPermission,
  verifyCommentPermission,
  commentController.reply
);

commentRouter.patch(
  "/update",
  verifyToken,
  verifyCommentPermission,
  commentController.update
);

commentRouter.delete(
  "/delete",
  verifyToken,
  verifyCommentPermission,
  commentController.remove
);

commentRouter.get("/list", verifyToken, commentController.getListByMomentId);

module.exports = commentRouter;
