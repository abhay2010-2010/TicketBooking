const Seat = require("../models/Seat");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

exports.getSeats = asyncHandler(async (req, res, next) => {
  const seats = await Seat.find().sort({ seatNumber: 1 });

  res.status(200).json({
    success: true,
    count: seats.length,
    data: seats,
  });
});

exports.getAvailableSeats = asyncHandler(async (req, res, next) => {
  const seats = await Seat.find({ isBooked: false }).sort({ seatNumber: 1 });

  res.status(200).json({
    success: true,
    count: seats.length,
    data: seats,
  });
});

exports.initializeSeats = asyncHandler(async (req, res, next) => {
  const existingSeats = await Seat.countDocuments();
  if (existingSeats > 0) {
    return next(new ErrorResponse("Seats are already initialized", 400));
  }

  const seatsToCreate = [];
  let seatNumber = 1;

  for (let row = 1; row <= 11; row++) {
    for (let seatInRow = 1; seatInRow <= 7; seatInRow++) {
      seatsToCreate.push({
        seatNumber,
        rowNumber: row,
        isBooked: false,
      });
      seatNumber++;
    }
  }

  for (let seatInRow = 1; seatInRow <= 3; seatInRow++) {
    seatsToCreate.push({
      seatNumber,
      rowNumber: 12,
      isBooked: false,
    });
    seatNumber++;
  }

  await Seat.insertMany(seatsToCreate);

  res.status(201).json({
    success: true,
    message: "All seats initialized successfully",
    count: seatsToCreate.length,
  });
});

exports.resetSeats = asyncHandler(async (req, res, next) => {
  await Seat.updateMany(
    {},
    { isBooked: false, bookedBy: null, bookingId: null }
  );

  res.status(200).json({
    success: true,
    message: "All seats reset successfully",
  });
});