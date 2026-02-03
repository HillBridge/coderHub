const fileService = require("../service/fileService");
const userService = require("../service/userService");
const errorType = require("../constants/errorType");

class FileController {
  async saveAvatarInfo(ctx, next) {
    // 获取请求
    const { filename, mimetype, size } = ctx.request.file;
    const { id: userId } = ctx.user;

    // 数据库操作
    try {
      await fileService.saveAvatarInfo({ filename, mimetype, size, userId });

      const { APP_HOST, APP_PORT } = require("../app/config");

      const filePath = `${APP_HOST}:${APP_PORT}/user/avatar/${userId}`;

      await userService.updateUserAvatar({ userId, filePath });

      // 返回结果
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

  async saveFileInfo(ctx, next) {
    const files = ctx.request.files;
    const { id: userId } = ctx.user;
    const { momentId } = ctx.query;

    if (!files || files.length === 0 || !momentId) {
      return ctx.app.emit("error", new Error(errorType.BAD_REQUEST), ctx);
    }

    try {
      for (const file of files) {
        const { filename, mimetype, size } = file;
        // 保存文件信息到file表
        await fileService.saveFileInfo({
          filename,
          mimetype,
          size,
          userId,
          momentId,
        });
      }

      ctx.body = {
        code: 200,
        message: "上传文件成功",
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        message: error.message,
      };
    }
  }
}

module.exports = new FileController();
