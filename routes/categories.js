const express = require("express");
const catchAsync = require("../utils/catchAsync");
const categoryControllers = require("../controllers/categories");
const router = express.Router();

router.get("/", catchAsync(categoryControllers.index));

module.exports = router;
