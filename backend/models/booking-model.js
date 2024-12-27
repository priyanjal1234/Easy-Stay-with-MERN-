const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "room",
      required: true,
    },
    checkInDate: {
      type: Date,
      required: true,
    },
    checkOutDate: {
      type: Date,
      required: true,
    },
    numberOfGuests: {
      type: Number,
      required: true,
      min: 1, 
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"], 
      default: "pending",
    },
    bookingStatus: {
      type: String,
      enum: ["confirmed", "cancelled"], 
      default: "confirmed",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("booking",bookingSchema)
