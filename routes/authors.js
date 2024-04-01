const express = require("express");
const catchAsync = require("../utils/catchAsync");
const authorControllers = require("../controllers/authors");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
const jwtValidation = require("../utils/jwtValidation");

router
  .route("/")
  .get(catchAsync(authorControllers.index))
  .post(
    jwtValidation,
    upload.single("image"),
    catchAsync(authorControllers.create)
  );

router.get("/perPage", catchAsync(authorControllers.paginatedIndex));

router
  .route("/:id")
  .get(catchAsync(authorControllers.show))
  .put(
    jwtValidation,
    upload.single("image"),
    catchAsync(authorControllers.update)
  )
  .delete(jwtValidation, catchAsync(authorControllers.delete));

module.exports = router;
