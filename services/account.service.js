const { errorHelper } = require("../helpers/error.helper");
const { responseHelper } = require("../helpers/response.helper");
const db = require("./../models");
const User = db.User;
const Account = db.Account;
const TransactionModel = db.Transaction;
const sequelize = db.sequelize;
async function createAccount(payload) {
  try {
    // Find or create the user
    const user = await User.findOrCreate(payload);

    // Create the account
    const account = await Account.create({
      account_type: payload.account_type,
      balance: payload.balance,
      user_id: user.id,
    });

    // Return the account
    return responseHelper(201, true, "account created successfully ", account);
  } catch (err) {
    console.log(err);
    return errorHelper(500, "service error", err.message);
  }
}

async function withdrawlBalance(payload) {
  const transaction = await sequelize.transaction();
  try {
    // Get the account to update
    const account = await Account.findByPk(payload.account_id);
    if (!account) {
      await transaction.rollback();
      return errorHelper(404, "account not found", " ");
    }

    // Update the account balance
    if (account.balance < payload.amount) {
      return responseHelper(422, false, "INSUFICIENT BALANCE", {
        balance: account.balance,
      });
    }

    account.balance -= payload.amount;
    // Save the account
    await account.save({ transaction });

    // Create a transaction history record
    const transactionData = {
      transaction_type: payload.type,
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
    console.log(err);

    // Rollback the transaction if something goes wrong
    await transaction.rollback();

    return errorHelper(500, "service error", err.message);
  }
}
async function depositeBalance(payload) {
  const transaction = await sequelize.transaction();
  try {

    // Get the account to update
    const account = await Account.findOne({ id: payload.account_id });
    console.log(account);
    if (!account) {
      await transaction.rollback();
      errorHelper(404, "account not found", " ");
    }

    // Update the account balance

    account.balance += payload.amount;

    // Save the account
    await account.save({ transaction });

    // Create a transaction history record
    const transactionData = {
      transaction_type: payload.type,
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
    console.log(err);

    // Rollback the transaction if something goes wrong
    await transaction.rollback();

    return errorHelper(500, "service error", err.message);
  }
}

module.exports = {
  createAccount,
  withdrawlBalance,
  depositeBalance,
};
