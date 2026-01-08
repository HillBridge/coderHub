const koa = require("koa");
const app = new koa();
const bodyParser = require("koa-bodyparser");
const userRouter = require("../router/userRouter");
const errorHandler = require("./errorHandler");

app.use(bodyParser());

app.use(userRouter.routes()).use(userRouter.allowedMethods());

app.on("error", errorHandler);

module.exports = app;
