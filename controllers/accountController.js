const { errorHelper } = require("../helpers/errorHelp");
const { payloadValidate } = require("../helpers/payloadValidationHelper");
const { createAccountService } = require("../services/account.service");

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
module.exports = {
  createAccount,
};

exports.updateAccount = async (req, res) => {
  res.status(200).send("account balance update");
};
