const bcrypt = require("bcryptjs");

const encryptPassword = async (plainPassword) => {
  const saltRounds = 10;

  // 生成哈希
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

  return hashedPassword;
};

const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

module.exports = {
  encryptPassword,
  comparePassword,
};
