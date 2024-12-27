import React, { useEffect, useState } from "react";
import {
  Elements,
  useStripe,
  useElements,
  PaymentRequestButtonElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useSelector } from "react-redux";

const stripePromise = loadStripe(
  "pk_test_51PyTasDI9aUSHk2XHmDdyJulMBPOmDzrNdoYLsxMdbnnFdUXWwnHPRRJcID26kS5X3vjUnkY8HlTkFDgITux6SIp00aRiynbVr"
);

const PaymentForm = () => {
  const [clientSecret, setClientSecret] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  let { totalprice } = useSelector((state) => state.booking);

  const handlePayment = async (event) => {
    event.preventDefault();

    let res = await axios.post(
      "http://localhost:3000/api/payment/payment-intent-2",
      { amount: totalprice * 100 },
      { withCredentials: true }
    );

    console.log(res);

    if (!stripe || !elements) return;

    const { error, paymentIntent } = await stripe.confirmPayment(clientSecret, {
      payment_method: {
        type: "upi",
        upi: {
          vpa: "your-vpa@upi", // Replace with user's UPI ID
        },
      },
    });

    if (error) {
      console.log("Payment failed", error);
    } else {
      console.log("Payment successful", paymentIntent);
    }
  };

  return (
    <div>
      <h1>UPI Payment</h1>

      <form onSubmit={handlePayment}>
        <button type="submit" disabled={!stripe}>
          Pay Now
        </button>
      </form>
    </div>
  );
};

const App = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default App;
