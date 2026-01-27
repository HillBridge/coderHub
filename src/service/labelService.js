const pool = require("../app/database");

class LabelService {
  async createLabel({ name }) {
    const statement = `INSERT INTO labels (name) VALUES (?)`;
    const [result] = await pool.execute(statement, [name]);
    return result;
  }
}

module.exports = new LabelService();
