const express = require("express");
const router = express.Router();
const check = require("../middleware/check");

// Tasks routes
router.use("/tasks", check.auth, require("./tasks"));

// Auth routes
router.use("/auth", require("./auth"));

module.exports = router;