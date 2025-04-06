const express = require("express");
const {
  bookSeats,
  getBookings,
  cancelBooking,
} = require("../controllers/booking");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, bookSeats);
router.get("/", protect, getBookings);
router.delete("/:id", protect, cancelBooking);

module.exports = router;
