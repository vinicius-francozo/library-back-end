const express = require("express");
const catchAsync = require("../utils/catchAsync");
const reviewControllers = require("../controllers/reviews");
const router = express.Router();
const jwtValidation = require("../utils/jwtValidation");

router.post("/:bookId", jwtValidation, catchAsync(reviewControllers.create));

router.get("/:id", jwtValidation, catchAsync(reviewControllers.getUserReviews));

router.delete("/:id", jwtValidation, catchAsync(reviewControllers.delete));

router.put("/:id", jwtValidation, catchAsync(reviewControllers.update));

module.exports = router;
