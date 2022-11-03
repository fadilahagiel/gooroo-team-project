const { comparePass } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password, role } = req.body;
      const newUser = await User.create({ username, email, password, role });
      res.status(200).json({ id: newUser.id, email: newUser.email });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      console.log(user);
      if (!user) {
        throw { name: "invalid_login" };
      }
      const validPassword = comparePass(password, user.password);
      if (!validPassword) {
        throw { name: "invalid_login" };
      }
      const payload = {
        id: user.id,
        role: user.role,
      };
      const access_token = createToken(payload);
      res.status(200).json({
        access_token: access_toke
        username: user.username,
        id: user.id,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
