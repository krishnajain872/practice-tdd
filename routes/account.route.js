var express = require("express");
const { checkAccessToken } = require("../middlewares/auth.middleware");
const { createAccount: account } = require("../controllers/account.controller");
var router = express.Router();
const {
  addAccountValidation,
} = require("../validators/user/account.validation");

router.route("/").post(checkAccessToken, addAccountValidation, account);

module.exports = router;
