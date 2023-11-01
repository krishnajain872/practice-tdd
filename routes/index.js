const express = require("express");
const router = express.Router();

router.use("/api/staging/user", require("./userRoutes"));

module.exports = router;
