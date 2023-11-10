const { errorHelper } = require("../helpers/error.helper");
const { responseHelper } = require("../helpers/response.helper");
const db = require("./../models");
const User = db.User;
const Account = db.Account;
const sequelize = db.sequelize;
const {
  passHashHelper,
  passCompareHelper,
} = require("./../helpers/password.helper");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
async function createAccount(payload) {
  const transaction = await sequelize.transaction();
  try {
    const transaction = await sequelize.transaction();
    // fetch user details
    const userData = {
      where: {
        mobile: payload.mobile,
      },
    };
    const user = await User.findOne(userData);
    if (!user) {
      transaction.rollback();
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
      transaction.rollback();
      return errorHelper(409, "Account already exist", isAccount);
    }

    if (user && payload.account_type && payload.balance) {
      const account = await Account.create(accountData);
      transaction.commit();
      return responseHelper(
        201,
        true,
        "account created successfully ",
        account
      );
    }
  } catch (err) {
    transaction.rollback();
    return errorHelper(500, "service error", err.message);
  }
}

module.exports = {
  createAccount,
};
