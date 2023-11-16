var express = require("express");
const { checkAccessToken } = require("../middlewares/auth.middleware");
const {
  withdrawalBalance: withdrawal,
} = require("../controllers/transaction.controller");
var router = express.Router();
const {
  updateAccountBalanceValidation,
} = require("../validators/user/account.validation");

router
  .route("/withdrawal")
  .post(checkAccessToken, updateAccountBalanceValidation, withdrawal);

module.exports = router;
