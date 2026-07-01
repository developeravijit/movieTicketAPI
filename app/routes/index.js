const express = require("express");
const user = require("./authRouter");
const theater = require("./theaterRouter");

const router = express.Router();

// Auth APi
router.use("/api/v1/auth", user);

// Theater API
router.use("/api/theater", theater);
module.exports = router;
