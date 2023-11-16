var express = require("express");
const { checkAccessToken } = require("../middlewares/auth.middleware");
const { withdrawalBalance,depositBalance } = require("../controllers/transaction.controller");
var router = express.Router();
const {
  updateAccountBalanceValidation,
} = require("../validators/account/account.validation");

router
  .route("/withdrawal")
  .patch(checkAccessToken, updateAccountBalanceValidation, withdrawalBalance);
router
  .route("/deposit")
  .patch(checkAccessToken, updateAccountBalanceValidation, depositBalance);

module.exports = router;
