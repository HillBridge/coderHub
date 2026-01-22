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

module.exports = commentRouter;
