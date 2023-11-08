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

async function withdrwalAccountBalance(payload) {}
async function depositeAccountBalance(payload) {}
module.exports = {
  createAccount,
  withdrwalAccountBalance,
  depositeAccountBalance,
};
