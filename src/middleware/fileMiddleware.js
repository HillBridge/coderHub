const multer = require("@koa/multer");

const upload = multer({ dest: "./uploads/avatar" });

const handleUploadAvatar = upload.single("avatar");

module.exports = {
  handleUploadAvatar,
};
