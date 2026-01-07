const pool = require("../app/database");

class UserService {
  async createUser(userInfo) {
    const { username, password } = userInfo;

    try {
      const statement = `INSERT INTO users (username, password) VALUES1 (?, ?)`;
      const [result] = await pool.execute(statement, [username, password]);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserService();
