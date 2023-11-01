var express = require("express");
const { registerUser, login } = require("../controllers/userControllers");

var router = express.Router();

router.route("/register").post(registerUser);
 

module.exports = router;