var express = require("express");
const { registerUser, loginUser } = require("../controllers/user.controller");
const { addUserValidation,  loginUserValidation } = require("../validators/user/user.validation");

var router = express.Router();

router.route("/register").post(addUserValidation, registerUser);
router.route("/login").post(loginUserValidation, loginUser);

module.exports = router;
