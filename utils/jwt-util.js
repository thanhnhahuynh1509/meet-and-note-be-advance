const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config");

function generateToken(data) {
  return jwt.sign(data, JWT_SECRET_KEY, {
    expiresIn: "2 days",
  });
}

function verify(token) {
  return jwt.verify(token, JWT_SECRET_KEY);
}

module.exports = {
  generateToken,
  verify,
};
