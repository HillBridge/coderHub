const mysql = require("mysql2/promise");
const config = require("./config");

const pool = mysql.createPool({
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD,
  database: config.MYSQL_DATABASE,
  connectionLimit: 10,
});

try {
  pool.getConnection().then(() => {
    console.log("数据库连接成功");
  });
} catch (error) {
  console.error("数据库连接失败", error);
}

module.exports = pool;
