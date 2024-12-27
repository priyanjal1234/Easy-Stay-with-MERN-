const express = require('express')
const router = express.Router()
const { isLoggedin } = require('../middlewares/isLoggedin')
const { createBooking } = require('../controllers/bookingController')

router.post("/create/:roomId",isLoggedin,createBooking)

module.exports = router