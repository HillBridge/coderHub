const multer = require("@koa/multer");
const path = require("path");
const { Jimp } = require("jimp");

const uploadAvatar = multer({ dest: "./uploads/avatar" });
const uploadFile = multer({ dest: "./uploads/file" });

const handleUploadAvatar = uploadAvatar.single("avatar");
const handleUploadFile = uploadFile.array("files", 10);

const handleFileResize = async (ctx, next) => {
  try {
    const files = ctx.request.files || [];
    const sizeArray = [320, 640, 1280];
    const outputDir = path.join(__dirname, "../../uploads/file");

    for (const file of files) {
      const image = await Jimp.read(file.path);

      // 1. 解析原文件名
      let { name, ext } = path.parse(file.filename);

      // 2. [关键修复] 如果文件没有后缀，根据 mimetype 补全
      if (!ext) {
        if (file.mimetype === "image/jpeg") ext = ".jpg";
        else if (file.mimetype === "image/png") ext = ".png";
        else if (file.mimetype === "image/gif") ext = ".gif";
        else ext = ".jpg"; // 默认保底为 jpg
      }

      // 并行处理多尺寸
      await Promise.all(
        sizeArray.map(async (size) => {
          const resizedImage = image.clone();

          // [上一轮修复] v1版本必须传对象
          resizedImage.resize({ w: size });

          // 3. 现在的路径一定包含后缀，例如: filename-320.jpg
          const savePath = path.join(outputDir, `${name}-${size}${ext}`);

          await resizedImage.write(savePath);
        })
      );
    }
    await next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  handleUploadAvatar,
  handleUploadFile,
  handleFileResize,
};
