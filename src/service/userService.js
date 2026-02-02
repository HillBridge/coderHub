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

  async getPasswordByUsername(username) {
    const statement = `SELECT password FROM users WHERE username = ?`;
    const [result] = await pool.execute(statement, [username]);
    return result;
  }

  async checkUserExist(userId) {
    const statement = `SELECT * FROM users WHERE id = ?`;
    const [result] = await pool.execute(statement, [userId]);
    return result;
  }

  async updateUserAvatar({ userId, filePath }) {
    const statement = `UPDATE users SET avatarUrl = ? WHERE id = ?`;
    const [result] = await pool.execute(statement, [filePath, userId]);
    return result;
  }
}

module.exports = new UserService();
