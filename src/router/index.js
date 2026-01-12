const fs = require("fs");

const useRoutes = function () {
  const files = fs.readdirSync(__dirname);
  for (const file of files) {
    if (!file.endsWith(".js") || file === "index.js") continue;
    const router = require(`./${file}`);
    this.use(router.routes()).use(router.allowedMethods());
  }
};

module.exports = useRoutes;
