const bcrypt = require("bcrypt");

function hashPassword(password) {
  console.log(password);
  return bcrypt.hashSync(password, 10);
}

function comparePassword(plainPassword, hashPassword) {
  console.log(plainPassword, hashPassword);
  return bcrypt.compareSync(plainPassword, hashPassword);
}

module.exports = {
  hashPassword,
  comparePassword,
};
