const { errorHelper } = require("../helpers/errorHelp");
const { responseHelper } = require("../helpers/responseHelp");
const db = require("./../models");
const User = db.User;
const Account = db.Account;
const {
  passHashHelper,
  passCompareHelper,
} = require("./../helpers/passHelper");
const jwt = require("jsonwebtoken");
const { payloadValidate } = require("../helpers/payloadValidationHelper");
const { Op } = require("sequelize");

async function createAccountService(payload) {
  try {
    //payload validation
    if (!payloadValidate(payload)) {
      return errorHelper(400, "validation error", "check payload");
    }
    // fetch user details
    const userData = {
      where: {
        id: payload.mobile,
      },
    };
    const account = {
      account_type: payload.account_type,
      balance: payload.balance,
      user_id: user.id,
    };
    const accountExist = {
      where: {
        [Op.and]: [
          { user_id: user.id },
          { account_type: payload.account_type },
        ],
      },
    };
    //
    const user = await User.findOne(userData);
    if (!user) {
      return errorHelper(404, "User Not Found", "");
    }
    const isAccount = await Account.find(accountExist);
    if (isAccount) {
      return errorHelper(409, "User already had same account", isAccount);
    }

    if (user.id && payload.account_type && payload.balance) {
      const account = await Account.create(account);
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
    return errorHelper(500, "service error", err.message);
  }
}

module.exports = {
  createAccountService,
};
