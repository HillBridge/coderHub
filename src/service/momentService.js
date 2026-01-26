const pool = require("../app/database");

const sqlFragment = `SELECT m.id id, m.content content, m.createTime createTime, JSON_OBJECT('userId', u.id, 'userName', u.username) userInfo 
      FROM moments m LEFT JOIN users u ON m.user_id = u.id`;

class MomentService {
  async create({ id, content }) {
    const statement = `INSERT INTO moments (content, user_id) VALUES (?, ?)`;
    const [result] = await pool.execute(statement, [content, id]);
    return result;
  }

  async getMomentById({ id }) {
    const statement = `${sqlFragment} WHERE user_id = ?`;
    const [result] = await pool.execute(statement, [id]);

    return result;
  }

  async getMomentList({ pageNum, pageSize }) {
    const statement = `${sqlFragment} LIMIT ?, ?`;
    const [result] = await pool.execute(statement, [pageNum, pageSize]);
    return result;
  }

  async update({ momentId, content }) {
    const statement = `UPDATE moments SET content = ? WHERE id = ?`;
    const [result] = await pool.execute(statement, [content, momentId]);
    return result;
  }

  async checkMomentPermission(momentId) {
    const statement = `SELECT * FROM moments WHERE id = ? AND user_id = ?`;
    const [result] = await pool.execute(statement, [momentId, userId]);
    return result;
  }

  async remove({ momentId }) {
    const statement = `DELETE FROM moments WHERE id = ?`;
    const [result] = await pool.execute(statement, [momentId]);
    return result;
  }
}

module.exports = new MomentService();
