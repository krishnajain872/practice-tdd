var express = require("express");
const { checkAccessToken } = require("../middlewares/auth.middleware");
const { withdrawalBalance } = require("../controllers/transaction.controller");
var router = express.Router();
const {
  updateAccountBalanceValidation,
} = require("../validators/account/account.validation");

router
  .route("/withdrawal")
  .post(checkAccessToken, updateAccountBalanceValidation, withdrawalBalance);

module.exports = router;
