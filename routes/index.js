const express = require("express");
const router = express.Router();

router.use("/user", require("./userRoutes"));
router.use("/account", require("./accountRoute"));

module.exports = router;
