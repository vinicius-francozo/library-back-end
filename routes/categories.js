const express = require("express");
const catchAsync = require("../utils/catchAsync");
const categoryControllers = require("../controllers/categories");
const router = express.Router();

router
  .route("/")
  .get(catchAsync(categoryControllers.index))
  .post(catchAsync(categoryControllers.create));

module.exports = router;
