const { errorHelper } = require("../helpers/error.helper");
const { responseHelper } = require("../helpers/response.helper");
const db = require("./../models");
const User = db.User;
const Account = db.Account;
const {
  passHashHelper,
  passCompareHelper,
} = require("./../helpers/password.helper");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

async function createAccount(payload) {
  try {
    // fetch user details
    const userData = {
      where: {
        mobile: payload.mobile,
      },
    };
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

async function widthdrawlAccountBalance(payload) {
  const transaction = await sequelize.transaction();
  try {
    // Validate the payload
    if (!payloadValidate(payload)) {
      await transaction.rollback();
      return errorHelper(400, "validation error", "check payload");
    }

    // Get the account to update
    const account = await Account.findOne({ id: payload.account_id });
    console.log(account);
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

module.exports = {
  createAccount,
  widthdrawlAccountBalance,
};
