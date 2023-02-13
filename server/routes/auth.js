const express = require("express");
const router = express.Router();

// POST: /auth/signin, handles signin requests, return accessToken, refreshToken and user data
router.post("/signin", require("../controllers/signin"));

// POST: /auth/signup, handles up requests, returns accessToken and user data if signup was successful
router.post("/signup", require("../controllers/signup"));

// POST: /auth/signup, handles up requests, returns accessToken and user data if signup was successful
router.post("/signout", require("../controllers/signout"));

// POST: /auth/refresh, handles refresh requests, returns new accessToken and fresh user data
router.post("/refresh", require("../controllers/refresh"));

module.exports = router;