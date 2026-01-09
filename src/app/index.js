const koa = require("koa");
const app = new koa();
const bodyParser = require("koa-bodyparser");
const userRouter = require("../router/userRouter");
const authRouter = require("../router/authRouter");
const errorHandler = require("./errorHandler");

app.use(bodyParser());

app.use(userRouter.routes()).use(userRouter.allowedMethods());
app.use(authRouter.routes()).use(authRouter.allowedMethods());

// 错误处理
app.on("error", errorHandler);

module.exports = app;
