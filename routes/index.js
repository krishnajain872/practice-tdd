const express = require("express");
const router = express.Router();

router.use("/user", require("./user.route"));
router.use("/account", require("./account.route"));

module.exports = router;
