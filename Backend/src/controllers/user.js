const Booking = require("../models/Booking");
const Seat = require("../models/Seat");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

exports.getUserDashboard = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const userBookings = await Booking.find({ user: userId });
  const totalBookedSeats = userBookings.reduce(
    (total, booking) => total + booking.totalSeats,
    0
  );

  const recentBookings = await Booking.find({ user: userId })
    .populate("seats")
    .sort({ createdAt: -1 })
    .limit(3);

  const user = await User.findById(userId);

  res.status(200).json({
    success: true,
    data: {
      user,
      totalBookings: userBookings.length,
      totalBookedSeats,
      recentBookings,
    },
  });
});

exports.updateProfile = asyncHandler(async (req, res, next) => {
  const { name, email } = req.body;

  const updateFields = {};
  if (name) updateFields.name = name;
  if (email) updateFields.email = email;

  const user = await User.findByIdAndUpdate(req.user.id, updateFields, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});