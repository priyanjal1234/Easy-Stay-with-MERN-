import React, { useState } from "react";
import { ArrowRight, CreditCard, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PaymentMethodCard from "../components/PaymentMethodCard";

const PaymentOptions = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState(null);

  const paymentMethods = [
    {
      icon: CreditCard,
      type: "card",
      title: "Credit/Debit Card",
      description: "Pay securely with your credit or debit card",
    },
    {
      icon: Wallet,
      type: "upi",
      title: "UPI",
      description: "Pay using UPI apps like Google Pay, PhonePe, etc.",
    },
    {
      type: "cod",
      title: "Cash on Delivery",
      description: "Pay on Delivery",
    },
  ];

  const handlePaymentSelection = (type) => {
    setSelectedMethod(type);
  };

  const handleContinue = () => {
    if (!selectedMethod) {
      toast.error("Please select a payment method!");
      return;
    }
    if (selectedMethod === "card") {
      navigate("/payment/card"); // Navigate to the card payment page
    } else if (selectedMethod === "upi") {
      navigate("/payment/upi"); // Navigate to the UPI payment page
    } else {
      toast.info("Cash on Delivery selected");
    }
  };

  return (
    <div className="w-full h-screen bg-[#111827] flex flex-col items-center text-white pt-8">
      <div className="flex mb-12">
        <CreditCard className="h-8 w-8 text-purple-500 mr-3" />
        <h1 className="text-3xl font-bold text-white">Select Payment Method</h1>
      </div>

      <div className="space-y-4 mb-8">
        {paymentMethods.map((item, index) => (
          <PaymentMethodCard
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
            selected={selectedMethod === item.type}
            onClick={() => handlePaymentSelection(item.type)}
          />
        ))}
      </div>

      <button
        onClick={handleContinue}
        disabled={!selectedMethod}
        className="w-[600px] flex items-center justify-center space-x-2 bg-purple-600 text-white rounded-lg py-3 px-4 disabled:bg-gray-700 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors duration-200"
      >
        <span>Continue</span>
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default PaymentOptions;
