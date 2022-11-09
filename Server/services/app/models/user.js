"use strict";
const { Model } = require("sequelize");

const { hashPass } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.SaldoHistory, { foreignKey: "UserId" });
      User.hasOne(models.Student, { foreignKey: "UserId" });
      User.hasOne(models.Teacher, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Username already used",
        },
        validate: {
          notEmpty: { msg: "Please input username" },
          notNull: { msg: "Please input username" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Email already exist"
        },
        validate: {
          notEmpty: { msg: `Please input email` },
          notNull: { msg: `Please input email` },
          isEmail: { msg: `Email must be in email format` },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: `Please input password` },
          notNull: { msg: `Please input password` },
          len: {
            args: [5, 255],
            msg: `Password must be more than 5 character`,
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        // allowNull: false,
        // validate: {
        //   notEmpty: { msg: `Please input role` },
        //   notNull: { msg: `Please input role` },
        // },
      },
      saldo: { type: DataTypes.INTEGER },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user) => {
    user.password = hashPass(user.password);
    user.saldo = 0;
  });
  return User;
};
