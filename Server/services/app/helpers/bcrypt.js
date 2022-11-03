var bcrypt = require("bcryptjs");

function hashPass(pass) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(pass, salt);
  return hash;
}

function comparePass(pass, hashedPass) {
  return bcrypt.compareSync(pass, hashedPass);
}

<<<<<<< HEAD
module.exports = { hashPass, comparePass };
=======
module.exports = { hashPass, comparePass };
>>>>>>> 64366f568b7c55280ee505107e2ede44820a01c1
