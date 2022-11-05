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
          msg: "username already used",
        },
        validate: {
          notEmpty: { msg: "please input username" },
          notNull: { msg: "please input username" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "email alrady exist" },
        validate: {
          notEmpty: { msg: `please input email` },
          notNull: { msg: `please input email` },
          isEmail: { msg: `must be email format` },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: `please input password` },
          notNull: { msg: `please input password` },
          len: {
            args: [5, 255],
            msg: `password must be more than 5 character`,
          },
        },
      },
      role: { type: DataTypes.STRING },
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
