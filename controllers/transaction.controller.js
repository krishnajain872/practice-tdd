const transactionServices = require("../services/transaction.service");

async function withdrawalBalance(req, res) {
  try {
    const payload = {
      ...req.body,
    };
    const response = await transactionServices.widthdrawalAccountBalance(
      payload
    );

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

async function depositBalance(req, res) {
  try {
    const payload = {
      ...req.body,
    };
    const response = await transactionServices.depositeAccountBalanceService(
      payload
    );

    if (response.success) {
      res.status(200).send(response);
    } else {
      res.status(response.code).send(response);
    }
  } catch (err) {
    res.status(500).send(err);
  }
}
module.exports = {
  withdrawalBalance,
  depositBalance,
};
