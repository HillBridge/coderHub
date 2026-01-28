const Router = require("koa-router");
const fileRouter = new Router({
  prefix: "/upload",
});

const { handleUploadAvatar } = require("../middleware/fileMiddleware");

const { verifyToken } = require("../middleware/authMiddleware");

fileRouter.post("/avatar", verifyToken, handleUploadAvatar);

module.exports = fileRouter;
