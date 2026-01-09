const pool = require("../app/database");

class UserService {
  async createUser({ username, password }) {
    const statement = `INSERT INTO users (username, password) VALUES (?, ?)`;
    const [result] = await pool.execute(statement, [username, password]);
    return result;
  }

  async getUserByUsername(username) {
    const statement = `SELECT * FROM users WHERE username = ?`;
    const [result] = await pool.execute(statement, [username]);
    return result;
  }
}

module.exports = new UserService();
