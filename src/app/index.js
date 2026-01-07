const koa = require("koa");
const app = new koa();
const bodyParser = require("koa-bodyparser");
const userRouter = require("../router/userRouter");

app.use(bodyParser());

app.use(userRouter.routes()).use(userRouter.allowedMethods());

module.exports = app;
