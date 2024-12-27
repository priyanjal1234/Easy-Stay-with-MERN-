import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentFormCard from "./PaymentFormCard";


const stripePromise = loadStripe("pk_test_51PyTasDI9aUSHk2XHmDdyJulMBPOmDzrNdoYLsxMdbnnFdUXWwnHPRRJcID26kS5X3vjUnkY8HlTkFDgITux6SIp00aRiynbVr");

function App() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentFormCard />
    </Elements>
  );
}

export default App;
