const pool = require("../app/database");

class LabelService {
  async createLabel({ name }) {
    const statement = `INSERT INTO labels (name) VALUES (?)`;
    const [result] = await pool.execute(statement, [name]);
    return result;
  }

  async getLabelByName({ labelName }) {
    const statement = `SELECT * FROM labels WHERE name = ?`;
    const [result] = await pool.execute(statement, [labelName]);
    return result;
  }

  async createLabel({ labelName }) {
    const statement = `INSERT INTO labels (name) VALUES (?)`;
    const [result] = await pool.execute(statement, [labelName]);
    return result;
  }

  async isLabelExists({ momentId, labelId }) {
    const statement = `SELECT * FROM moments_to_labels WHERE moment_id = ? AND label_id = ?`;
    const [result] = await pool.execute(statement, [momentId, labelId]);
    return result;
  }

  async getLabelList({ pageNum, pageSize }) {
    const statement = `SELECT * FROM labels LIMIT ?, ?`;
    const [result] = await pool.execute(statement, [pageNum, pageSize]);
    return result;
  }
}

module.exports = new LabelService();
