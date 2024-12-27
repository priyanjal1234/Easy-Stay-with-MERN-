const express = require('express')
const router = express.Router()
const { getAllRooms, getOneRoom, checkRoomAvailability } = require('../controllers/roomController')
const { isLoggedin } = require('../middlewares/isLoggedin')

router.get("/all-rooms",getAllRooms)

router.get("/room/:id",getOneRoom)

router.post("/check/room/:id",isLoggedin,checkRoomAvailability)

module.exports = router