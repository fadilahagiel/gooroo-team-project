'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Student, { foreignKey: "StudentId" })
      Transaction.belongsTo(models.Class, { foreignKey: "ClassId" })
    }
  }
  Transaction.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    ClassId: {
      type: DataTypes.INTEGER,
    },
    StudentId: {
      type: DataTypes.INTEGER
    },
    rating: {
      type: DataTypes.DECIMAL
    },
    testimoni: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Transaction',
    hooks: {
      beforeCreate(transaction) {
        transaction.rating = 0,
        transaction.testimoni = null
      }
    }
  });
  return Transaction;
};