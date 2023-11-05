const { errorHelper } = require("../helpers/errorHelp");
const { responseHelper } = require("../helpers/responseHelp");
const db = require("./../models");
const TransactionModel = db.Transaction;
const User = db.User;

const Account = db.Account;
const {
  passHashHelper,
  passCompareHelper,
} = require("./../helpers/passHelper");
const jwt = require("jsonwebtoken");
const { payloadValidate } = require("../helpers/payloadValidationHelper");
const { Op } = require("sequelize");
const { Transaction } = require("sequelize");
async function createAccountService(payload) {
  try {
    if (!payloadValidate(payload)) {
      return errorHelper(400, "validation error", "check payload");
    }
    // fetch user details
    const userData = {
      where: {
        mobile: payload.mobile,
      },
    };

    //
    const user = await User.findOne(userData);
    console.log("this is user data  ()=>", user);
    if (!user) {
      return errorHelper(404, "User Not Found", "");
    }
    const accountExist = {
      where: {
        [Op.and]: [
          { user_id: user.id },
          { account_type: payload.account_type },
        ],
      },
    };
    const accountData = {
      account_type: payload.account_type,
      balance: payload.balance,
      user_id: user.id,
    };

    const isAccount = await Account.findOne(accountExist);
    if (isAccount) {
      return errorHelper(409, "User already had same account", isAccount);
    }

    if (user && payload.account_type && payload.balance) {
      const account = await Account.create(accountData);
      return responseHelper(
        201,
        true,
        "account created successfully ",
        account
      );

      console.log(account);
    } else {
      return responseHelper(
        422,
        false,
        "account not created",
        "check your paylaod "
      );
    }
  } catch (err) {
    console.log(err);
    return errorHelper(500, "service error", err.message);
  }
}

async function updateAccountBalanceService(payload) {
  const transaction = await sequelize.transaction();
  try {
    // Validate the payload
    if (!payloadValidate(payload)) {
      await transaction.rollback();
      return errorHelper(400, "validation error", "check payload");
    }
    // Get the account to update
    const account = await Account.findOne(payload.account_id);
    if (!account) {
      await transaction.rollback();
      errorHelper(404, "account not found", " ");
    }
    // Update the account balance
    if (payload.type === "deposite") {
      account.balance += payload.amount;
    }
    // Update the account balance
    if (payload.type === "withdrawl") {
      account.balance -= payload.amount;
    }

    await account.save({ transaction });

    // Commit the transaction
    const transactionData = {
      transaction_type: payload.type,
      account_id: account.id,
      is_successful: account.id ? true : false,
      status: "completed",
      account_role: payload.type === "deposite" ? "reciver" : "sender",
      trans_ref_id: null,
    };

    const history = await TransactionModel.create(transactionData);
    if (!history) {
      await transaction.rollback();
      return errorHelper(500, "service error", "Transaction failed");
    } else {
      await transaction.commit();
      return responseHelper(200, true, "transaction success full", history);
    }
  } catch (err) {
    console.log(err);

    // Rollback the transaction if something goes wrong
    await transaction.rollback();

    return errorHelper(500, "service error", err.message);
  }
}

module.exports = {
  createAccountService,
  updateAccountBalanceService,
};
