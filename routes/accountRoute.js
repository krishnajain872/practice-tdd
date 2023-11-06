var express = require("express");
const { checkAccessToken } = require("../middlewares/auth.middleware");
const { createAccount, updateAccount } = require("../controllers/accountController");
const {
  addAccountValidation,
} = require("../validators/user/account.validation");
const {
  withdrwalAccountBalanceService,
} = require("../services/account.service");
var router = express.Router();

router
  .route("/create-account")
  .post(checkAccessToken, addAccountValidation, createAccount);
router
  .route("/transaction/update/balance")
  .post(checkAccessToken, withdrwalAccountBalanceService, updateAccount);
// router.route("/account").get();

module.exports = router;
