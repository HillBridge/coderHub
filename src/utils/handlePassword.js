const bcrypt = require("bcryptjs");

const encryptPassword = async (plainPassword) => {
  const saltRounds = 10;

  // 生成哈希
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

  return hashedPassword;
};

module.exports = {
  encryptPassword,
};
