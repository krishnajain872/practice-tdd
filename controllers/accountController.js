const {
  createAccount,
  depositeBalance,
  withdrawlBalance
} = require("../services/account.service");

async function account(req, res) {
  try {
    // payload
    const payload = req.body;
    // service call
    const response = await createAccount(payload);
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

async function withdrawlAccountBalance(req, res) {
  try {
    console.log("this withdrawl controller called");
    const payload = {
      account_id: req.params.account_id,
      amount: req.body.amount,
      type: req.body.type,
    };
    console.log("=> PAYLOAD CONTROLLER  ", payload);
    const response = await withdrawlBalance(payload);

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

async function depositeAccountBalance(req, res) {
  try {
    const payload = {
      account_id: req.params.account_id,
      amount: req.body.amount,
      type: req.body.type,
    };

    console.log("=> PAYLOAD CONTROLLER  ", payload);
    const response = await depositeBalance(payload);

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
  account,
  withdrawlAccountBalance,
  depositeAccountBalance,
};
