"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SaldoHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SaldoHistory.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  SaldoHistory.init(
    {
      amount: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      description: DataTypes.STRING,
      balance: DataTypes.INTEGER,
      category: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "SaldoHistory",
    }
  );

  return SaldoHistory;
};
