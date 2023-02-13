const express = require("express");
const router = express.Router();
const check = require("../middleware/check");



// Auth routes
router.use("/auth", require("./auth"));

module.exports = router;