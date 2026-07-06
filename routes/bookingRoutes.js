const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.get("/checkout/:restaurantId", bookingController.getBookingCheckout);
router.post("/", bookingController.createBooking);
router.get("/:id", bookingController.getBookingDetails);

module.exports = router;
