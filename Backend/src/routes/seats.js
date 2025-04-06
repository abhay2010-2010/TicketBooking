const express = require("express");
const {
  getSeats,
  getAvailableSeats,
  initializeSeats,
  resetSeats,
} = require("../controllers/seats");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/", getSeats);
router.get("/available", getAvailableSeats);
router.post("/init", protect, initializeSeats);
router.post("/reset", protect, resetSeats);

module.exports = router;
