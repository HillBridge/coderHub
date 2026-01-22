const pool = require("../app/database");

class CommentService {
  async create({ userId, momentId, content }) {
    const statement = `INSERT INTO comments (content, user_id, moment_id) VALUES (?, ?, ?)`;
    const [result] = await pool.execute(statement, [content, userId, momentId]);
    return result;
  }

  async checkMomentPermission(momentId) {
    const statement = `SELECT * FROM moments WHERE id = ?`;
    const [result] = await pool.execute(statement, [momentId]);
    return result;
  }
}

module.exports = new CommentService();
