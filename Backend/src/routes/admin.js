const express = require("express");
const {
  getUsers,
  getAllBookings,
  deleteUser,
  getDashboardStats,
  cancelAnyBooking,
} = require("../controllers/admin");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.use(protect);
router.use(authorize("admin"));

router.get("/users", getUsers);
router.get("/bookings", getAllBookings);
router.delete("/users/:id", deleteUser);
router.get("/stats", getDashboardStats);
router.delete("/bookings/:id", cancelAnyBooking);

module.exports = router;
