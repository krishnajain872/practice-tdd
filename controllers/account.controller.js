const accountService = require("../services/account.service");
async function createAccount(req, res) {
  try {
    // payload
    const payload = req.body;
    // service call
    const response = await accountService.createAccount(payload);
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
