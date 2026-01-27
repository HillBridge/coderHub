const errorType = require("../constants/errorType");
const labelService = require("../service/labelService");

const verifyLabelPermission = async (ctx, next) => {
  const { labels } = ctx.request.body;

  if (!Array.isArray(labels) || labels.length === 0) {
    return ctx.app.emit("error", new Error(errorType.BAD_REQUEST), ctx);
  }

  const labelsArray = [];
  try {
    for (const labelName of labels) {
      const label = {
        name: labelName,
        id: null,
      };
      const result = await labelService.getLabelByName({ labelName });
      if (result.length < 1) {
        const newLabel = await labelService.createLabel({ labelName });
        label.id = newLabel.insertId;
      } else {
        label.id = result[0].id;
      }
      labelsArray.push(label);
    }
  } catch (error) {
    return (ctx.body = {
      code: 500,
      message: error.message,
    });
  }

  ctx.labels = labelsArray;
  await next();
};

module.exports = {
  verifyLabelPermission,
};
