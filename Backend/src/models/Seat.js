const mongoose = require("mongoose");

const SeatSchema = new mongoose.Schema({
  seatNumber: {
    type: Number,
    required: true,
    unique: true,
    min: 1,
    max: 80,
  },
  rowNumber: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
  bookedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    default: null,
  },
  bookingId: {
    type: mongoose.Schema.ObjectId,
    ref: "Booking",
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Seat", SeatSchema);
