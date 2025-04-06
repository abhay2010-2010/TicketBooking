const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  seats: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Seat",
    },
  ],
  seatNumbers: [
    {
      type: Number,
    },
  ],
  totalSeats: {
    type: Number,
    required: true,
    min: 1,
    max: 7,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Booking", BookingSchema);
