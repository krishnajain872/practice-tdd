var express = require("express");
const { checkAccessToken } = require("../middlewares/auth.middleware");
const { account, withdrawal } = require("../controllers/account.controller");
const {
  addAccountValidation, updateAccountBalanceValidation,
} = require("../validators/user/account.validation");

var router = express.Router();

router.route("/").post(checkAccessToken, addAccountValidation, account);
router
  .route("/:account_id/withdrawal")
  .post(checkAccessToken, updateAccountBalanceValidation, withdrawal);

module.exports = router;
