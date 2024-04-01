const express = require("express");
const catchAsync = require("../utils/catchAsync");
const favoriteControllers = require("../controllers/favorites");
const router = express.Router();
const jwtValidation = require("../utils/jwtValidation");

router.get("/", jwtValidation, catchAsync(favoriteControllers.index));

router
  .route("/:bookId")
  .post(jwtValidation, catchAsync(favoriteControllers.create))
  .get(jwtValidation, catchAsync(favoriteControllers.show));

router.delete(
  "/:bookId",
  jwtValidation,
  catchAsync(favoriteControllers.delete)
);

module.exports = router;
