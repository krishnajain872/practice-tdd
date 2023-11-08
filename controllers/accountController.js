const { errorHelper } = require("../helpers/error.helper");

async function createAccount(req, res) {
  res.status(202).send("welcome to account");
}
module.exports = {
  createAccount,
};
