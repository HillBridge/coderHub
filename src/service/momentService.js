const pool = require("../app/database");

class MomentService {
  async create({ id, content }) {
    const statement = `INSERT INTO moments (content, user_id) VALUES (?, ?)`;
    const [result] = await pool.execute(statement, [content, id]);
    return result;
  }

  async getMomentById({ id }) {
    const statement = `SELECT m.id id, m.content content, m.createTime createTime, JSON_OBJECT('userId', u.id, 'userName', u.username) userInfo 
      FROM moments m LEFT JOIN users u ON m.user_id = u.id WHERE user_id = ?`;
    const [result] = await pool.execute(statement, [id]);

    return result;
  }
}

module.exports = new MomentService();
