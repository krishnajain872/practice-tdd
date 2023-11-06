var express = require("express");
const { checkAccessToken } = require("../middlewares/auth.middleware");
const {
  createAccount,
  updateAccount,
} = require("../controllers/accountController");
const {
  addAccountValidation,
  updateAccountBalanceValidation,
} = require("../validators/user/account.validation");
const {
  withdrwalAccountBalanceService,
} = require("../services/account.service");
var router = express.Router();

router
  .route("/create-account")
  .post(checkAccessToken, addAccountValidation, createAccount);
router
  .route("/transaction/withdrawl-balance/:account_id")
  .post(checkAccessToken, withdrwalAccountBalanceService, updateAccount);
// router.route("/account").get();

module.exports = router;
