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
      Class.belongsToMany(models.Student, {
        through: models.Transaction,
        foreignKey: "ClassId",
      });
      Class.belongsTo(models.Subject, { foreignKey: "SubjectId" });
      Class.hasMany(models.Schedule, { foreignKey: "ClassId" });
      Class.belongsTo(models.Teacher,{foreignKey:"TeacherId"})
    }
  }
  Class.init(
    {
      TeacherId: DataTypes.INTEGER,
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: `Name is required` },
          notNull: { msg: `Name is required` },
          len: {
            args: [5, 255],
            msg: `Name must be more than 5 character`,
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: `Price is required` },
          notNull: { msg: `Price is required` },
          min: {
            args: [10000],
            msg: "Minimal Price is Rp 10,000 !",
          },
        },
      },
      quota: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: `Quota is required` },
          notNull: { msg: `Quota is required` },
          min: {
            args: [1],
            msg: "Minimal Quota is 1 !",
          },
        },
      },
      averageRating: DataTypes.INTEGER,
      status: DataTypes.STRING,
      SubjectId: DataTypes.INTEGER,
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: `Description is required` },
          notNull: { msg: `Description is required` },
          len: {
            args: [20, 255],
            msg: `Description must be more than 20 character`,
          },
        },
      },
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Class",
      hooks: {
        beforeCreate(Class) {
          Class.averageRating = 0;
          Class.status = "upcoming";
        },
      },
    }
  );
  return Class;
};
