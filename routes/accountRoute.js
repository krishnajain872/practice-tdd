var express = require("express");
const { checkAccessToken } = require("../middlewares/auth.middleware");
const { createAccount } = require("../controllers/accountController");
var router = express.Router();

router.route("/create-account").post(checkAccessToken,createAccount);
// router.route("/account").get();

module.exports = router;
