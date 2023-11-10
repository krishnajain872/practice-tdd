const express = require("express");
const router = express.Router();

router.use("/users", require("./user.route"));
router.use("/accounts", require("./account.route"));

module.exports = router;
