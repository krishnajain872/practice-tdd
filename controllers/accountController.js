const { errorHelper } = require("../helpers/errorHelp");
const {
  createAccountService,
  widthdrawlAccountBalanceService,
} = require("../services/account.service");

exports.createAccount = async (req, res) => {
  try {
    // payload
    const payload = req.body;

    // validate payload
    let isNotEmpty = Object.keys(payload).map(
      (key) => payload[key].length != 0
    );
    if (!isNotEmpty) {
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
};

exports.withdrawlAccountBalanceController = async (req, res) => {
  try {
    const payload = {
      account_id: req.params.account_id,
      amount: req.body.amount,
      type: req.body.type,
    };

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
};
