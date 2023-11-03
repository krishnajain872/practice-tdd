var express = require("express");
const { registerUser, loginUser } = require("../controllers/userControllers");
const { addUserValidation } = require("./../validators/user/user.validation");

var router = express.Router();

router.route("/register").post(addUserValidation, registerUser);
router.route("/login").post(addLoginValidation, loginUser);

module.exports = router;
