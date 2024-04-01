const express = require("express");
const catchAsync = require("../utils/catchAsync");
const authController = require("../controllers/authentication");
const router = express.Router();

router.post("/login", catchAsync(authController.login));

module.exports = router;
