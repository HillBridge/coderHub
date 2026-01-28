const pool = require("../app/database");

class MomentService {
  async create({ id, content }) {
    const statement = `INSERT INTO moments (content, user_id) VALUES (?, ?)`;
    const [result] = await pool.execute(statement, [content, id]);
    return result;
  }

  async getMomentById({ id }) {
    // 子查询来解决查询重复问题以及JOIN的干扰
    // 子查询: 查询每个动态的评论数量
    // 子查询: 查询每个动态的标签数量
    // 在一个sql中查询不同表的不同数据, 可以通过子查询的方式查询更加清晰和安全
    const statement = `
    SELECT 
        m.id id, 
        m.content content, 
        m.createTime createTime, 
        JSON_OBJECT('userId', u.id, 'userName', u.username) userInfo,
        (SELECT JSON_ARRAYAGG(
            JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id)
        ) FROM comments c WHERE c.moment_id = m.id) AS comments,
        (SELECT JSON_ARRAYAGG(
            JSON_OBJECT('id', l.id, 'name', l.name)
        ) FROM moments_to_labels ml 
          JOIN labels l ON ml.label_id = l.id 
          WHERE ml.moment_id = m.id) AS labels
    FROM moments m 
    LEFT JOIN users u ON m.user_id = u.id 
    WHERE m.id = ?;`;
    const [result] = await pool.execute(statement, [id]);

    return result;
  }

  async getMomentList({ pageNum, pageSize }) {
    // 子查询: 查询每个动态的评论数量
    const statement = `SELECT m.id id, m.content content, m.createTime createTime, JSON_OBJECT('userId', u.id, 'userName', u.username) userInfo, 
      (SELECT COUNT(*) FROM comments c WHERE c.moment_id = m.id) commentCount
      FROM moments m LEFT JOIN users u ON m.user_id = u.id LIMIT ?, ?`;
    const [result] = await pool.execute(statement, [pageNum, pageSize]);
    return result;
  }

  async update({ momentId, content }) {
    const statement = `UPDATE moments SET content = ? WHERE id = ?`;
    const [result] = await pool.execute(statement, [content, momentId]);
    return result;
  }

  async checkMomentPermission(momentId, userId) {
    const statement = `SELECT * FROM moments WHERE id = ? AND user_id = ?`;
    const [result] = await pool.execute(statement, [momentId, userId]);
    return result;
  }

  async remove({ momentId }) {
    const statement = `DELETE FROM moments WHERE id = ?`;
    const [result] = await pool.execute(statement, [momentId]);
    return result;
  }

  async addLabelToMoment({ momentId, labelId }) {
    const statement = `INSERT INTO moments_to_labels (moment_id, label_id) VALUES (?, ?)`;
    const [result] = await pool.execute(statement, [momentId, labelId]);
    return result;
  }
}

module.exports = new MomentService();
