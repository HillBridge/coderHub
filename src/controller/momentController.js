const momentService = require("../service/momentService");
const errorType = require("../constants/errorType");
const labelService = require("../service/labelService");

class MomentController {
  async create(ctx, next) {
    // 获取内容
    const { id } = ctx.user;
    const { content } = ctx.request.body;

    if (!content) {
      return ctx.app.emit("error", new Error(errorType.BAD_REQUEST), ctx);
    }

    // 数据库操作
    try {
      await momentService.create({ id, content });
      ctx.body = {
        code: 200,
        message: "创建动态成功!!",
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        message: error.message,
      };
    }
  }

  async detail(ctx, next) {
    const { id } = ctx.params;
    if (!id) {
      return ctx.app.emit("error", new Error(errorType.BAD_REQUEST), ctx);
    }

    // 数据库操作
    try {
      const result = await momentService.getMomentById({ id });
      if (result.length < 1) {
        ctx.body = {
          code: 200,
          message: "动态不存在!!",
        };
      } else {
        ctx.body = {
          code: 200,
          message: "获取单条动态成功!!",
          data: result[0],
        };
      }
    } catch (error) {
      ctx.body = {
        code: 500,
        message: error.message,
      };
    }
  }

  async list(ctx, next) {
    const { pageNum = 1, pageSize = 10 } = ctx.query;

    if (pageNum <= 0 || pageSize <= 0) {
      return ctx.app.emit("error", new Error(errorType.BAD_REQUEST), ctx);
    }
    try {
      const result = await momentService.getMomentList({ pageNum, pageSize });
      ctx.body = {
        code: 200,
        message: "获取动态列表成功!!",
        data: result,
        total: result.length,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        message: error.message,
      };
    }
  }

  async update(ctx, next) {
    const { momentId, content } = ctx.request.body;
    if (!momentId || !content) {
      return ctx.app.emit("error", new Error(errorType.BAD_REQUEST), ctx);
    }

    try {
      await momentService.update({ momentId, content });
      ctx.body = {
        code: 200,
        message: "更新动态成功!!",
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        message: error.message,
      };
    }
  }

  async remove(ctx, next) {
    const { momentId } = ctx.request.body;
    if (!momentId) {
      return ctx.app.emit("error", new Error(errorType.BAD_REQUEST), ctx);
    }

    try {
      await momentService.remove({ momentId });
      ctx.body = {
        code: 200,
        message: "删除动态成功!!",
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        message: error.message,
      };
    }
  }

  async addLabelToMoment(ctx, next) {
    const { momentId } = ctx.request.body;
    const { labels } = ctx;

    try {
      for (const label of labels) {
        const isLabelExists = await labelService.isLabelExists({
          momentId,
          labelId: label.id,
        });
        if (isLabelExists.length > 0) {
          continue;
        }
        await momentService.addLabelToMoment({ momentId, labelId: label.id });
      }
      ctx.body = {
        code: 200,
        message: "添加标签成功!!",
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        message: error.message,
      };
    }
  }
}

module.exports = new MomentController();
