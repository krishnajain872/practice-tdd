var express = require("express");
const { checkAccessToken } = require("../middlewares/auth.middleware");
const {
  createAccount,
  withdrawlAccountBalanceController,
  depositeAccountBalanceController,
} = require("../controllers/accountController");
const {
  addAccountValidation,
  updateAccountBalanceValidation,
} = require("../validators/account/account.validation");

var router = express.Router();

router
  .route("/create-account")
  .post(checkAccessToken, addAccountValidation, createAccount);
router
  .route("/transaction/withdrawl-balance/:account_id")
  .patch(
    checkAccessToken,
    updateAccountBalanceValidation,
    withdrawlAccountBalanceController
  );
router
  .route("/transaction/deposite-balance/:account_id")
  .patch(
    checkAccessToken,
    updateAccountBalanceValidation,
    depositeAccountBalanceController
  );
// router.route("/account").get();

module.exports = router;
