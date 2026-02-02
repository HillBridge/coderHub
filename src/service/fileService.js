const pool = require("../app/database");

class UserService {
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
}

module.exports = new UserService();
