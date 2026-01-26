const pool = require("../app/database");

class CommentService {
  async create({ userId, momentId, content }) {
    const statement = `INSERT INTO comments (content, user_id, moment_id) VALUES (?, ?, ?)`;
    const [result] = await pool.execute(statement, [content, userId, momentId]);
    return result;
  }

  async checkCommentPermission(momentId) {
    const statement = `SELECT * FROM comments WHERE id = ?`;
    const [result] = await pool.execute(statement, [momentId]);
    return result;
  }

  async reply({ userId, momentId, commentId, content }) {
    const statement = `INSERT INTO comments (content, user_id, moment_id, comment_id) VALUES (?, ?, ?, ?)`;
    const [result] = await pool.execute(statement, [
      content,
      userId,
      momentId,
      commentId,
    ]);
    return result;
  }

  async update({ commentId, content }) {
    const statement = `UPDATE comments SET content = ? WHERE id = ?`;
    const [result] = await pool.execute(statement, [content, commentId]);
    return result;
  }

  async remove({ commentId }) {
    const statement = `DELETE FROM comments WHERE id = ?`;
    const [result] = await pool.execute(statement, [commentId]);
    return result;
  }
}

module.exports = new CommentService();
