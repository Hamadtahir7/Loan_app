'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Loan extends Model {
    static associate(models) {
      // define association here
    }
  }
  Loan.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    applicant_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    loan_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    tenure_months: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    purpose: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('PENDING', 'APPROVED', 'REJECTED'),
      defaultValue: 'PENDING',
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Loan',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  });
  return Loan;
};