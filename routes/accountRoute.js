var express = require("express");
const { checkAccessToken } = require("../middlewares/auth.middleware");
const {
  addAccountValidation,
  updateAccountBalanceValidation,
} = require("../validators/user/account.validation");
const { account, updateAccount } = require("../controllers/accountController");
var router = express.Router();

router
  .route("/create-account")
  .post(checkAccessToken, addAccountValidation, account);
router
  .route("/transaction/withdrawl")
  .post(checkAccessToken, updateAccountBalanceValidation, updateAccount);
// router.route("/account").get();

module.exports = router;
