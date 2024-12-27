import React from "react";

const PaymentMethodCard = ({ icon: Icon, title, description, selected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`w-[600px] p-4 border-2 rounded-lg cursor-pointer transition-transform transform ${
        selected ? "border-purple-600 scale-105" : "border-gray-600"
      } hover:scale-105`}
    >
      <div className="flex items-center">
        {Icon && <Icon className="h-6 w-6 text-purple-500 mr-3" />}
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodCard;
