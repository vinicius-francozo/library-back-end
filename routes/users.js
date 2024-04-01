const express = require("express");
const catchAsync = require("../utils/catchAsync");
const userControllers = require("../controllers/users");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
const jwtValidation = require("../utils/jwtValidation");

router
  .route("/:id")
  .get(catchAsync(userControllers.show))
  .put(jwtValidation, catchAsync(userControllers.update));

router.put(
  "/changeImage/:id",
  jwtValidation,
  upload.single("image"),
  catchAsync(userControllers.changeImage)
);

router.post("/create", catchAsync(userControllers.create));

module.exports = router;
