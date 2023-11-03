var express = require("express");
var router = express.Router();

router.route("/create-account/:id").post(addAccountValidation,authried, registerUser);
router.route("/account").get(addLoginValidation, loginUser);

module.exports = router;
