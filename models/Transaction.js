"use strict";
const { Model, UUID } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.Transaction, {
        as: "transaction_ref_to",
      });
      Transaction.hasOne(models.Transaction, {
        foreignKey: "trans_ref_id",
        as: "transaction_ref_from",
      });
      Transaction.hasOne(models.Account, {
        foreignKey: "account_id",
        as: "account_details",
      });
    }
  }
  Transaction.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUID,
      },
      transaction_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_sucessful: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      account_id: {
        type: DataTypes.UUID,
        allowNull: false,
        type: DataTypes.UUID,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      account_role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      trans_ref_id: {
        type: DataTypes.UUID,
      },
    },
    {
      sequelize,
      modelName: "Transaction",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Transaction;
};
