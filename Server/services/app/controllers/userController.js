const { comparePass } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User, Student } = require("../models");

const midtransClient = require("midtrans-client");

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password, role } = req.body;
      const newUser = await User.create({ username, email, password, role });
      res.status(201).json({ id: newUser.id, email: newUser.email });
    } catch (error) {
      console.log(error, 'ini error')
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: "invalid_login" };
      }
      const user = await User.findOne({ where: { email } });
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
        access_token: access_token,
        username: user.username,
        id: user.id,
      });
    } catch (error) {
      next(error);
    }
  }

  static async topup(req, res, next) {
    try {
      const { price } = req.body;
      const findUser = await User.findOne({
        where: {
          id: req.user.id,
        },
        include: Student,
      });

      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: "SB-Mid-server-4SbP9885175rZWTHMq1UcYPu",
      });

      let parameter = {
        transaction_details: {
          order_id: new Date(),
          gross_amount: price,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          full_name: findUser.Student.fullName,
          email: findUser.email,
        },
      };

      snap.createTransaction(parameter).then((transaction) => {
        res.status(200).json({ transaction });
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
