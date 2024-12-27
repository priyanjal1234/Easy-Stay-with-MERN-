const bookingModel = require("../models/booking-model");

module.exports.createBooking = async function (req, res) {
  let { roomId } = req.params;
  let { user, checkInDate, checkOutDate, numberOfGuests, totalPrice } =
    req.body;
  try {
    let booking = await bookingModel.create({
      user,
      room: roomId,
      checkInDate,
      checkOutDate,
      numberOfGuests,
      totalPrice,
    });
    res.status(201).json({ message: "Booking Created Successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
