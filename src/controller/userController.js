const userService = require("../service/userService");
const fileService = require("../service/fileService");
const path = require("path");
const fs = require("fs");
const errorType = require("../constants/errorType");

class UserController {
  async register(ctx, next) {
    // 获取请求
    const { username, password } = ctx.request.body;

    // 数据库操作
    try {
      await userService.createUser({ username, password });
      ctx.body = {
        code: 200,
        message: "用户注册成功",
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

module.exports = new UserController();
