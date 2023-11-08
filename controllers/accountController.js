const { createAccount } = require("../services/account.service");

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
async function updateAccount(req, res) {
  res.status(200).send("account balance update");
}

module.exports = {
  account,
  updateAccount,
};
