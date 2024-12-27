const express = require('express')
const router = express.Router()
const { createPaymentIntent, createAnotherPayment } = require('../controllers/paymentController')
const { isLoggedin } = require('../middlewares/isLoggedin')

router.post("/create-payment-intent",isLoggedin,createPaymentIntent)

router.post("/payment-intent-2",isLoggedin,createAnotherPayment)

module.exports = router