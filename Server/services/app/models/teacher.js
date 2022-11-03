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
=======
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
>>>>>>> 64366f568b7c55280ee505107e2ede44820a01c1
  return Teacher;
};
