"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Class.belongsToMany(models.Student, {
        through: models.Wishlist,
        foreignKey: "ClassId",
      });
    }
  }
  Class.init(
    {
      TeacherId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      quota: DataTypes.INTEGER,
      averageRating: DataTypes.INTEGER,
      status: DataTypes.STRING,
      SubjectId: DataTypes.INTEGER,
      description: DataTypes.STRING,
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Class",
    }
  );
  return Class;
};
