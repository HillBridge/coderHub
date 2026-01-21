const pool = require("../app/database");

class PermissionService {
  async checkPermission(momentId, userId) {
    const statement = `SELECT * FROM moments WHERE id = ? AND user_id = ?`;
    const [result] = await pool.execute(statement, [momentId, userId]);
    return result;
  }
}

module.exports = new PermissionService();
