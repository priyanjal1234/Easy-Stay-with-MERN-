const roomModel = require("../models/room-model");

module.exports.getAllRooms = async function (req, res) {
  try {
    let allRooms = await roomModel.find();
    res.status(200).json(allRooms);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.getOneRoom = async function (req, res) {
  let { id } = req.params;
  try {
    let room = await roomModel.findOne({ _id: id });
    if (!room)
      return res.status(404).json({ message: "Room with this id not found" });
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.checkRoomAvailability = async function (req, res) {
  let { id } = req.params;
  let { checkIn, checkOut, guests } = req.body;

  // if (!checkIn || !checkOut || !guests) {
  //   return res.status(400).json({ message: "All Fields are required" });
  // }
  try {
    let room = await roomModel.findOne({ _id: id });
    if (!room)
      return res.status(404).json({ message: "Room with this id not found" });
    let isAvailable =
      new Date(checkIn) >= new Date(room.availability.from) &&
      new Date(checkOut) <= new Date(room.availability.to) &&
      Number(guests) <= Number(room?.maxGuests);
    if (isAvailable) {
      return res.status(200).json({ available: true });
    } else {
      return res.status(200).json({ available: false });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

