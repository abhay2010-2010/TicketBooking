const Booking = require("../models/Booking");
const Seat = require("../models/Seat");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const mongoose = require("mongoose");

exports.bookSeats = asyncHandler(async (req, res, next) => {
  const { numberOfSeats } = req.body;
  const userId = req.user.id;

  if (!numberOfSeats || numberOfSeats < 1 || numberOfSeats > 7) {
    return next(
      new ErrorResponse("Please provide a valid number of seats (1-7)", 400)
    );
  }

  const allSeats = await Seat.find({}).sort({ rowNumber: 1, seatNumber: 1 });

  const seatsByRow = {};
  allSeats.forEach((seat) => {
    if (!seatsByRow[seat.rowNumber]) {
      seatsByRow[seat.rowNumber] = [];
    }
    seatsByRow[seat.rowNumber].push(seat);
  });

  let seatsToBook = [];

  for (const rowNumber in seatsByRow) {
    const rowSeats = seatsByRow[rowNumber].filter((seat) => !seat.isBooked);

    if (rowSeats.length >= numberOfSeats) {
      seatsToBook = rowSeats.slice(0, numberOfSeats);
      break;
    }
  }

  if (seatsToBook.length < numberOfSeats) {
    seatsToBook = [];

    const availableSeats = allSeats.filter((seat) => !seat.isBooked);

    if (availableSeats.length >= numberOfSeats) {
      seatsToBook = availableSeats.slice(0, numberOfSeats);
    } else {
      return next(
        new ErrorResponse(
          `Not enough seats available. Only ${availableSeats.length} seats are available.`,
          400
        )
      );
    }
  }

  if (seatsToBook.length < numberOfSeats) {
    return next(
      new ErrorResponse("Not enough seats available for booking", 400)
    );
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const booking = await Booking.create(
      [
        {
          user: userId,
          seats: seatsToBook.map((seat) => seat._id),
          seatNumbers: seatsToBook.map((seat) => seat.seatNumber),
          totalSeats: numberOfSeats,
        },
      ],
      { session }
    );

    const seatIds = seatsToBook.map((seat) => seat._id);
    await Seat.updateMany(
      { _id: { $in: seatIds } },
      { isBooked: true, bookedBy: userId, bookingId: booking[0]._id },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      data: {
        booking: booking[0],
        seats: seatsToBook,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return next(new ErrorResponse("Error booking seats", 500));
  }
});

exports.getBookings = asyncHandler(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user.id })
    .populate("seats")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: bookings.length,
    data: bookings,
  });
});

exports.cancelBooking = asyncHandler(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(
      new ErrorResponse(`Booking not found with id of ${req.params.id}`, 404)
    );
  }

  if (booking.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse("Not authorized to cancel this booking", 401)
    );
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await Seat.updateMany(
      { bookingId: booking._id },
      { isBooked: false, bookedBy: null, bookingId: null },
      { session }
    );

    await booking.deleteOne({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return next(new ErrorResponse("Error canceling booking", 500));
  }
});
