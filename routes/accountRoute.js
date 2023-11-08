var express = require("express");
const { checkAccessToken } = require("../middlewares/auth.middleware");
const {
  addAccountValidation,
  updateAccountBalanceValidation,
} = require("../validators/account/account.validation");
const {
  account,
  withdrawlAccountBalance,
} = require("../controllers/accountController");
var router = express.Router();

router
  .route("/create-account")
  .post(checkAccessToken, addAccountValidation, account);
router
  .route("/transaction/withdrawl-balance/:account_id")
  .patch(
    checkAccessToken,
    updateAccountBalanceValidation,
    withdrawlAccountBalance
  );
// router.route("/account").get();

module.exports = router;
