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
    }
  }
<<<<<<< HEAD
  Teacher.init(
    {
      fullName: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
      bio: DataTypes.STRING,
      image: DataTypes.STRING,
      averageRating: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "Teacher",
    }
  );
=======
  Teacher.init({
    fullName: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    bio: DataTypes.STRING,
    image: DataTypes.STRING,
    averageRating: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Teacher',
  });
>>>>>>> e9fb868d591a564d73dbba174b1f4e068e744c70
  return Teacher;
};
