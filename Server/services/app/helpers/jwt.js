const jwt = require("jsonwebtoken");
const SECRET = "RAHASIA";

function createToken(payload) {
  return jwt.sign(payload, SECRET);
}
function verifyToken(token) {
  return jwt.verify(token, SECRET);
}

module.exports = {
  createToken,
  verifyToken,
};
