const express = require("express");
const catchAsync = require("../utils/catchAsync");
const rentControllers = require("../controllers/rents");
const router = express.Router();
const jwtValidation = require("../utils/jwtValidation");

router.get(
  "/checkout",
  jwtValidation,
  catchAsync(rentControllers.listCheckout)
);

router.get(
  "/checkout/:bookId",
  jwtValidation,
  catchAsync(rentControllers.getOneCheckoutOrRented)
);

router
  .route("/")
  .get(jwtValidation, catchAsync(rentControllers.listRents))
  .put(jwtValidation, catchAsync(rentControllers.confirmPurchase));

router
  .route("/:id")
  .patch(jwtValidation, catchAsync(rentControllers.returnBook))
  .delete(jwtValidation, catchAsync(rentControllers.delete));

router.post("/:bookId", jwtValidation, catchAsync(rentControllers.create));

module.exports = router;
