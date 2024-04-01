const express = require("express");
const catchAsync = require("../utils/catchAsync");
const bookControllers = require("../controllers/books");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
const jwtValidation = require("../utils/jwtValidation");

router
  .route("/")
  .get(catchAsync(bookControllers.index))
  .post(
    jwtValidation,
    upload.single("image"),
    catchAsync(bookControllers.create)
  );

router.get("/perPage", catchAsync(bookControllers.paginatedIndex));

router
  .route("/:id")
  .get(catchAsync(bookControllers.show))
  .put(
    jwtValidation,
    upload.single("image"),
    catchAsync(bookControllers.update)
  )
  .delete(jwtValidation, catchAsync(bookControllers.delete));

router.get("/find/:name", catchAsync(bookControllers.listByName));

module.exports = router;
