import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

const PayPalPayment = ({ amount, onSuccess }) => {
  const [paymentError, setPaymentError] = useState(null);

  const initialOptions = {
    "client-id":
      "AWrR0dEDBlc9AVYB7E-RbYM8HyZMGiRs_ibLN1lcJXBnv8DhZc1BuvhagRX5ycmsDSNQ3B5TxKya81_v",
    "enable-funding": "card",
  };

  const handlePaymentCapture = async (details) => {
    try {
      const response = await axios.post("http://localhost:5000/api/payments", {
        amount: amount,
        paymentMethod: "PayPal",
        paymentDetails: details,
      });

      if (response.data.success) {
        onSuccess(response.data);
      } else {
        setPaymentError("Payment processing failed. Please try again.");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      setPaymentError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-white">Pay with PayPal</h2>
      {paymentError && <p className="text-red-500 mb-4">{paymentError}</p>}
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{ layout: "vertical", shape: "rect" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: amount.toString(),
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then(handlePaymentCapture);
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default PayPalPayment;
