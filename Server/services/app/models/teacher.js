"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Teacher.belongsTo(models.User, { foreignKey: "UserId" });
      Teacher.hasMany(models.Class, { foreignKey: "TeacherId" });
    }
  }
  Teacher.init(
    {
      fullName: {
        type: DataTypes.STRING,
      },
      UserId: {
        type: DataTypes.STRING,
      },
      bio: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
      averageRating: {
        type: DataTypes.DECIMAL,
      },
    },
    {
      sequelize,
      modelName: "Teacher",
    }
  );
  return Teacher;
};
