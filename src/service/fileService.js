const pool = require("../app/database");

class FileService {
  async saveAvatarInfo({ filename, mimetype, size, userId }) {
    const statement = `INSERT INTO avatars (fileName, mimeType, size, user_id) VALUES (?, ?, ?, ?)`;
    const [result] = await pool.execute(statement, [
      filename,
      mimetype,
      size,
      userId,
    ]);
    return result;
  }

  async getAvatarInfoById({ userId }) {
    const statement = `SELECT * FROM avatars WHERE user_id = ?`;
    const [result] = await pool.execute(statement, [userId]);
    return result;
  }
}

module.exports = new FileService();
