const Router = require("koa-router");
const labelRouter = new Router({
  prefix: "/label",
});
const labelController = require("../controller/labelController");
const { verifyToken } = require("../middleware/authMiddleware");

labelRouter.post("/create", verifyToken, labelController.create);

module.exports = labelRouter;
