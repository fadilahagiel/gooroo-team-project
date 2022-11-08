const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "invalid_token" };
    }
    console.log('masuk', access_token);
    const payload = verifyToken(access_token);
    const user = await User.findByPk(payload.id);
    if (!user) {
      throw { name: "invalid_token" };
    }
    req.user = {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
