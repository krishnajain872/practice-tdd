var express = require("express");
const { checkAccessToken } = require("../middlewares/auth.middleware");
const { account } = require("../controllers/account.controller");
const { withdrawal } = require("../controllers/transaction.controller");
var router = express.Router();
const {
  addAccountValidation,
  updateAccountBalanceValidation,
} = require("../validators/user/account.validation");

router.route("/").post(checkAccessToken, addAccountValidation, account);
router
  .route("/:account_id/transaction/withdrawal")
  .post(checkAccessToken, updateAccountBalanceValidation, withdrawal);

module.exports = router;
