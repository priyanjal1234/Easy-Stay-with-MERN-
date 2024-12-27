const Stripe = require("stripe");
const userModel = require("../models/user-model");
const bookingModel = require("../models/booking-model");

const stripe = Stripe(
  "sk_test_51PyTasDI9aUSHk2XXqxDOL75XUMfVfkprGMhwo87shQdtUiJ2Fg3MYfjd0Y0dAbQwtMDSRwIg8empUujrza2EG7600SYQ9w9Im"
);

module.exports.createPaymentIntent = async function (req, res) {
  let { amount } = req.body;

  let user = await userModel.findOne({ email: req.user.email });

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount),
      currency: "inr",
      payment_method_types: ["card"],
    });

    if (paymentIntent) {
      let booking = await bookingModel.findOne({ user: user._id });

      booking.paymentStatus = "paid";
      await booking.save();
      res.status(200).json({
        clientSecret: paymentIntent.client_secret,
      });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.createAnotherPayment = async function (req, res) {
  let { amount } = req.body;

  try {
    let paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "inr",
      payment_method_types: ["upi"],
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret, // Return clientSecret to frontend for confirmation
    });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
