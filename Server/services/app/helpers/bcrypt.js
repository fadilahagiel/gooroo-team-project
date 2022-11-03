var bcrypt = require("bcryptjs");

function hashPass(pass) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(pass, salt);
  return hash;
}

function comparePass(pass, hashedPass) {
  return bcrypt.compareSync(pass, hashedPass);
}

module.exports = { hashPass, comparePass };
