const User = require("../models/User");
const Booking = require("../models/Booking");
const Seat = require("../models/Seat");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

exports.getAllBookings = asyncHandler(async (req, res, next) => {
  const bookings = await Booking.find()
    .populate("user", "name email")
    .populate("seats");

  res.status(200).json({
    success: true,
    count: bookings.length,
    data: bookings,
  });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }

  if (user.role === "admin") {
    return next(new ErrorResponse(`Cannot delete admin users`, 403));
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});

exports.getDashboardStats = asyncHandler(async (req, res, next) => {
  const totalUsers = await User.countDocuments({ role: "user" });
  const totalAdmins = await User.countDocuments({ role: "admin" });
  const totalBookings = await Booking.countDocuments();
  const totalBookedSeats = await Seat.countDocuments({ isBooked: true });
  const totalAvailableSeats = await Seat.countDocuments({ isBooked: false });

  const recentBookings = await Booking.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 })
    .limit(5);

  res.status(200).json({
    success: true,
    data: {
      totalUsers,
      totalAdmins,
      totalBookings,
      totalBookedSeats,
      totalAvailableSeats,
      recentBookings,
    },
  });
});

exports.cancelAnyBooking = asyncHandler(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(
      new ErrorResponse(`Booking not found with id of ${req.params.id}`, 404)
    );
  }

  await Seat.updateMany(
    { bookingId: booking._id },
    { isBooked: false, bookedBy: null, bookingId: null }
  );

  await booking.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});
