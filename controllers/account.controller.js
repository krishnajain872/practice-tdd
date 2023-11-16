const accountService = require("../services/account.service");
async function createAccount(req, res) {
  try {
    // payload
    const payload = req.body;
    // service call
    const response = await accountService.createAccount(payload);
    if (response.code === 201 && response.success === true) {
      res.status(201).send(response);
    } else {
      res.status(response.code).send(response);
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = {
  createAccount,
};
