const { account, account_balance } = require("./account.validation.schema");

module.exports = {
  addAccountValidation: async (req, res, next) => {
    const value = await account.validate({
      account_type: req.body.account_type,
      balance: req.body.balance,
      mobile: req.body.mobile,
    });
    if (value.error) {
      res.status(400).json({
        code: 400,
        success: false,
        body: {
          message: value.error.details[0].message,
        },
      });
    } else {
      res.status(200);
      next();
    }
  },
  updateAccountBalanceValidation: async (req, res, next) => {
    const  id = JSON.stringify(req.params.account_id)
    const value = await account_balance.validate({
      account_id: id,
      amount: req.body.amount,
      type: req.body.type,
    });
    if (value.error) {
      res.status(400).json({
        code: 400,
        success: false,
        body: {
          message: value.error.details[0].message,
        },
      });
    } else {
      res.status(200);
      next();
    }
  },
};
