import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import paymentService from "../services/PaymentService";
import { setTotalPrice } from "../redux/reducers/BookingReducer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PaymentFormCard = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  let dispatch = useDispatch();
  let navigate = useNavigate()

  let { totalprice } = useSelector((state) => state.booking);

  const handleCardPayment = async (event) => {
    event.preventDefault();

    let createPaymentIntent = await paymentService.createPaymentIntent(
      totalprice * 100
    );
    let { clientSecret } = createPaymentIntent.data;

    let { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (paymentIntent.status === "succeeded") {
      toast.success("Payment Successfull");
      dispatch(setTotalPrice(0));
      navigate("/");
    }
  };

  return (
    <div className="w-full h-screen bg-gray-900 text-white flex flex-col items-center pt-10">
      <h1 className="text-3xl mb-6">Pay with Credit/Debit Card</h1>
      <form onSubmit={handleCardPayment} className="w-[400px]">
        <CardElement
          options={{
            style: {
              base: {
                color: "#fff",
                fontSize: "16px",
                lineHeight: "24px",
              },
              invalid: {
                color: "#e54242",
              },
            },
          }}
          className="mb-5"
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
          disabled={!stripe || loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default PaymentFormCard;
