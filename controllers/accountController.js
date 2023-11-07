const { errorHelper } = require("../helpers/errorHelp");
const { payloadValidate } = require("../helpers/payloadValidationHelper");
const {
  createAccountService,
  widthdrawlAccountBalanceService,
} = require("../services/account.service");

async function createAccount(req, res) {
  try {
    // payload
    const payload = req.body;
    // validate payload
    if (!payloadValidate(payload)) {
      return errorHelper(400, "Bad request", "validation error check payload");
    }
    // service call42
    const response = await createAccountService(payload);
    console.log("responsev => API CONTROLLER RESPONSE", response);
    if (response.code === 201 && response.success === true) {
      res.status(201).send(response);
    } else {
      res.status(response.code).send(response);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

async function withdrawlAccountBalanceController(req, res) {
  try {
    console.log("this withdrawl controller called");
    const payload = {
      account_id: req.params.account_id,
      amount: req.body.amount,
      type: req.body.type,
    };

    // validate payload
    if (!payloadValidate(payload)) {
      return errorHelper(400, "Bad request", "validation error check payload");
    }

    console.log("=> PAYLOAD CONTROLLER  ", payload);
    const response = await widthdrawlAccountBalanceService(payload);

    if (response.success) {
      res.status(200).send(response);
    } else {
      res.status(response.code).send(response);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
module.exports = {
  createAccount,
  withdrawlAccountBalanceController,
};
