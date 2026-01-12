const koa = require("koa");
const app = new koa();
const bodyParser = require("koa-bodyparser");

const errorHandler = require("./errorHandler");
const useRoutes = require("../router");

app.useRoutes = useRoutes;

app.use(bodyParser());

app.useRoutes();

// 错误处理
app.on("error", errorHandler);

module.exports = app;
