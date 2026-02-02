const fs = require("fs");
const path = require("path");
const fileService = require("../service/fileService");
const errorType = require("../constants/errorType");

class FileController {
  async saveAvatarInfo(ctx, next) {
    // 获取请求
    const { filename, mimetype, size } = ctx.request.file;
    const { id: userId } = ctx.user;

    // 数据库操作
    try {
      await fileService.saveAvatarInfo({ filename, mimetype, size, userId });
      ctx.body = {
        code: 200,
        message: "上传头像成功",
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        message: error.message,
      };
    }
  }

  async getAvatarInfo(ctx, next) {
    const { userId } = ctx.params;
    if (!userId) {
      return ctx.app.emit("error", new Error(errorType.BAD_REQUEST), ctx);
    }
    try {
      const result = await fileService.getAvatarInfoById({ userId });
      if (result.length < 1) {
        return ctx.app.emit("error", new Error(errorType.FILE_NOT_FOUND), ctx);
      }
      const { fileName, mimeType } = result[0];
      // 获取头像文件路径
      const avatarPath = path.join(__dirname, "../../uploads/avatar", fileName);
      // 创建读取流
      const avatarBuffer = fs.createReadStream(avatarPath);
      // 设置响应头类型
      ctx.response.set("content-type", mimeType);
      // 直接将流式数据返回给客户端
      ctx.body = avatarBuffer;
    } catch (error) {
      ctx.body = {
        code: 500,
        message: error.message,
      };
    }
  }
}

module.exports = new FileController();
