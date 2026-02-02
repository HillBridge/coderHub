const multer = require("@koa/multer");

const uploadAvatar = multer({ dest: "./uploads/avatar" });
const uploadFile = multer({ dest: "./uploads/file" });

const handleUploadAvatar = uploadAvatar.single("avatar");
const handleUploadFile = uploadFile.array("files", 10);

module.exports = {
  handleUploadAvatar,
  handleUploadFile,
};
