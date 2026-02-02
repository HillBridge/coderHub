const Router = require("koa-router");
const fileRouter = new Router({
  prefix: "/upload",
});

const {
  handleUploadAvatar,
  handleUploadFile,
} = require("../middleware/fileMiddleware");
const { verifyToken } = require("../middleware/authMiddleware");

const fileController = require("../controller/fileController");

fileRouter.post(
  "/avatar",
  verifyToken,
  handleUploadAvatar,
  fileController.saveAvatarInfo
);

fileRouter.post(
  "/file",
  verifyToken,
  handleUploadFile,
  fileController.saveFileInfo
);

module.exports = fileRouter;
