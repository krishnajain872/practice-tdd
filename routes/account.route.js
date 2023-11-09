var express = require("express");
const { checkAccessToken } = require("../middlewares/auth.middleware");
const { account } = require("../controllers/account.controller");
const { addAccountValidation } = require("../validators/user/account.validation");
 
var router = express.Router();

router.route("/").post(checkAccessToken,addAccountValidation,account);

module.exports = router;
