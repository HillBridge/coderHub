const fileService = require("../service/fileService");

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
}

module.exports = new FileController();
