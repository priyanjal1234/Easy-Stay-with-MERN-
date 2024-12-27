const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    address: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    verificationCode: Number,
    isVerified: {
      type: Boolean,
      default: false,
    },
    googleId: {
      type: String,
    },
    resetPasswordToken: String,
    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "room",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
