const pool = require("../app/database");

class UserService {
  async createUser(userInfo) {
    const { username, password } = userInfo;

    try {
      // 1. 判断用户是否存在
      const checkStatement = `SELECT * FROM users WHERE username = ?`;
      const [checkResult] = await pool.execute(checkStatement, [username]);

      if (checkResult.length > 0) {
        return Promise.reject(new Error("用户已存在"));
      }

      // 2. 创建用户
      const createStatement = `INSERT INTO users (username1, password) VALUES (?, ?)`;
      const [createResult] = await pool.execute(createStatement, [
        username,
        password,
      ]);
      return createResult;
    } catch (error) {
      return Promise.reject(new Error("创建用户失败"));
    }
  }
}

module.exports = new UserService();
