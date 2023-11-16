const express = require("express");
const router = express.Router();

router.use("/users", require("./user.route"));
router.use("/accounts", require("./account.route"));
router.use("/transactions", require("./transaction.route"));

module.exports = router;
