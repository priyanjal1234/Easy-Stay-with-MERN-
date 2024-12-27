const mongoose = require("mongoose");

const roomSchema = mongoose.Schema(
  {
    roomName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    roomType: {
      type: String,
      required: true,
      enum: [
        "Single",
        "Double",
        "Suite",
        "Entire Apartment",
        "Villa",
        "Shared Room",
      ],
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    pricePerNight: {
      type: Number,
      required: true,
      min: 0,
    },
    maxGuests: {
      type: Number,
      required: true,
      min: 1,
    },
    image: {
      type: String,
      required: true,
    },
    availability: {
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
        required: true,
      },
    },
    facilities: {
      type: [String],
      default: [],
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("room", roomSchema);
