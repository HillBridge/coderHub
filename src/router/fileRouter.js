const Router = require("koa-router");
const fileRouter = new Router({
  prefix: "/upload",
});

const {
  handleUploadAvatar,
  handleUploadFile,
  handleFileResize,
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
  handleFileResize,
  fileController.saveFileInfo
);

module.exports = fileRouter;
