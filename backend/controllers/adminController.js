const roomModel = require("../models/room-model");
const userModel = require("../models/user-model");

module.exports.createRoom = async function (req, res) {
  let user = await userModel.findOne({ email: req.user.email, isAdmin: true });
  let {
    roomName,
    roomType,
    description,
    pricePerNight,
    maxGuests,
    availabilityFrom,
    availabilityTo,
    facilities,
  } = req.body;

  try {
    if (
      !roomName ||
      !roomType ||
      !description ||
      !pricePerNight ||
      !maxGuests ||
      !availabilityFrom ||
      !availabilityTo ||
      !facilities
    ) {
      return res.status(400).json({ message: "All Fields are required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Room Image is required" });
    }

    let room = await roomModel.create({
      roomName,
      roomType,
      description,
      pricePerNight,
      maxGuests,
      availability: {
        from: availabilityFrom,
        to: availabilityTo,
      },
      facilities: String(facilities).split(","),
      image: req.file.path,
      creatorId: user._id,
    });

    user.rooms.push(room._id);
    await user.save();

    res.status(201).json({ message: "Room Created Successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};


module.exports.deleteRoom = async function (req, res) {
  try {
    let roomDeleted = await roomModel.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ message: "Room Deleted" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

