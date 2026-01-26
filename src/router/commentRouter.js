const Router = require("koa-router");
const commentRouter = new Router({
  prefix: "/comment",
});
const commentController = require("../controller/commentController");
const { verifyToken } = require("../middleware/authMiddleware");
const { verifyCommentPermission } = require("../middleware/commentMiddleware");

commentRouter.post(
  "/create",
  verifyToken,
  verifyCommentPermission,
  commentController.create
);

commentRouter.post(
  "/reply",
  verifyToken,
  verifyCommentPermission,
  commentController.reply
);

commentRouter.patch("/update", verifyToken, commentController.update);

module.exports = commentRouter;
