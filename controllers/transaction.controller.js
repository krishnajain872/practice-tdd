const  transactionServices  = require("../services/transaction.service");

async function withdrawalBalance(req, res) {
  try {
    const payload = {
      account_id: req.body.account_id,
      amount: req.body.amount,
    };
    const response = await transactionServices.widthdrawalAccountBalance(payload);

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
  withdrawalBalance,
};
