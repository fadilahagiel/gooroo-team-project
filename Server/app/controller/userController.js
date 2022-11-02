const { User } = require("../models");

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password, role } = req.body;
      const allUser = await User.findAll();
      allUser.forEach((el) => {
        if (el.email === email) {
          throw { name: "invalid_email" };
        }
      });
      const newUser = await User.create({ username, email, password, role });
      res.status(200).json({ id: newUser.id, email: newUser.email });
    } catch (error) {
      if (error.name == "invalid_email") {
        res.status(400).json({ message: "email already used" });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
  static async login(req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ where: { email }})

      if(!user){
          throw {name: 'invalid_login'}
      }
      const validPassword = await compare(password, user.password)
      if(!validPassword) {
          throw {name: 'invalid_login'}
      }
    } catch (error) {}
  }
}

module.exports = UserController;
