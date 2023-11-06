var express = require("express");
const { checkAccessToken } = require("../middlewares/auth.middleware");
const {
  createAccount,

  withdrawlAccountBalanceController,
} = require("../controllers/accountController");
const {
  addAccountValidation,
  updateAccountBalanceValidation,
} = require("../validators/user/account.validation");
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
// router.route("/account").get();

module.exports = router;
