const express = require("express");
const user = require("./authRouter");
const movie = require("./moviesRouter");

const router = express.Router();

// Auth APi
router.use("/api/v1/auth", user);

// Theater API
router.use("/api/v1", movie);

module.exports = router;
