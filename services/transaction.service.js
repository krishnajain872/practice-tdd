const { errorHelper } = require("../helpers/error.helper");
const { responseHelper } = require("../helpers/response.helper");
const db = require("./../models");
const Account = db.Account;
const sequelize = db.sequelize;
const TransactionModel = db.Transaction;
async function widthdrawalAccountBalance(payload) {
  const transaction = await sequelize.transaction();
  try {
    // Get the account to update
    const account = await Account.findByPk(payload.account_id);
    if (!account) {
      await transaction.rollback();
      errorHelper(404, "account not found", " ");
    }

    // Update the account balance
    if (account.balance < payload.amount) {
      return responseHelper(422, false, "INSUFICIENT BALANCE", {
        balance: account.balance,
      });
    }

    account.balance = Number(account.balance) - Number(payload.amount);

    // Save the account
    await account.save({ transaction });

    // Create a transaction history record
    const transactionData = {
      transaction_type: "withdrawal",
      account_id: account.id,
      is_sucessful: true,
      status: "completed",
      account_role: "sender",
      trans_ref_id: null,
    };

    const history = await TransactionModel.create(transactionData);

    // Commit the transaction
    await transaction.commit();

    // Return the transaction history
    return responseHelper(200, true, "transaction success full", {
      history,
      balance: account.balance,
    });
  } catch (err) {
    // Rollback the transaction if something goes wrong
    await transaction.rollback();

    return errorHelper(500, "service error", err.message);
  }
}

async function depositeAccountBalanceService(payload) {
  const transaction = await sequelize.transaction();
  try {
    // Get the account to update
    const account = await Account.findByPk(payload.account_id);
    if (!account) {
      await transaction.rollback();
      return errorHelper(404, "account not found", " ");
    }
    // Update the account balance

    account.balance = Number(account.balance) + Number(payload.amount);

    // Save the account
    await account.save({ transaction });

    // Create a transaction history record
    const transactionData = {
      transaction_type: "deposite",
      account_id: account.id,
      is_sucessful: true,
      status: "completed",
      account_role: "reciver",
      trans_ref_id: null,
    };

    const history = await TransactionModel.create(transactionData);
    // Commit the transaction
    await transaction.commit();
    // Return the transaction history
    return responseHelper(200, true, "transaction success full", {
      history,
      balance: account.balance,
    });
  } catch (err) {
    // Rollback the transaction if something goes wrong
    await transaction.rollback();

    return errorHelper(500, "service error", err.message);
  }
}

module.exports = {
  widthdrawalAccountBalance,
  depositeAccountBalanceService,
};
