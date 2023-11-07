var express = require("express");
const { checkAccessToken } = require("../middlewares/auth.middleware");
const { createAccount } = require("../controllers/accountController");
const {
  addAccountValidation,
  updateAccountBalanceValidation,
} = require("../validators/user/account.validation");
var router = express.Router();

router
  .route("/create-account")
  .post(checkAccessToken, addAccountValidation, createAccount);
router
  .route("/transaction/withdrawl")
  .post(checkAccessToken, updateAccountBalanceValidation, updateAccount);
// router.route("/account").get();

module.exports = router;
