"use strict";
const { Model, UUID, UUIDV1 } = require("sequelize");
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
        foreignKey: "trans_ref_id",
        targetKey: "id",
      });
      Transaction.hasOne(models.Transaction, {
        foreignKey: "trans_ref_id",
        as: "transaction_ref_from",
        sourceKey: "id",
      });
      Transaction.belongsTo(models.Account, {
        foreignKey: "account_id",
        as: "account_details",
        targetKey: "id",
      });
    }
  }
  Transaction.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV1,
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
      tableName: "transactions",
    }
  );
  return Transaction;
};
