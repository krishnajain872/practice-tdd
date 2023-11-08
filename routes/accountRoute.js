var express = require("express");
const { checkAccessToken } = require("../middlewares/auth.middleware");
const { account } = require("../controllers/accountController");
const { addAccountValidation } = require("../validators/user/account.validation");
 
var router = express.Router();

router.route("/create-account").post(checkAccessToken,addAccountValidation,account);


module.exports = router;
