/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { useAppSelector } from "../../../../redux/features/hooks";
import { selectCurrentUser } from "../../../../redux/features/auth/authSlice";
import {
  useInitiatePaymentMutation,
  useSavePaymentMutation,
} from "../../../../redux/features/payment/paymentApi";

const StripePayment = () => {
  const user = useAppSelector(selectCurrentUser);
  const [initiatePayment] = useInitiatePaymentMutation();
  const stripe = useStripe();
  const elements = useElements();
  const [savePayment] = useSavePaymentMutation();

  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState("");
  const [cardValid, setCardValid] = useState(false); // Track card validity

  const data = JSON.parse(localStorage.getItem("paymentInfo") || "{}");
  const totalAmount = data?.totalCost || 0;

  useEffect(() => {
    const fetchClientSecret = async () => {
      const paymentData = {
        paymentMethod: "stripe",
        amount: totalAmount,
        transactionId: `txn_${Date.now()}`,
      };

      try {
        const res = await initiatePayment(paymentData).unwrap();
        setClientSecret(res?.data?.clientSecret || ""); // Ensure correct path
      } catch (err) {
        setError("Failed to initiate payment. Try again later.");
      }
    };

    if (totalAmount > 0) {
      fetchClientSecret();
    }
  }, [totalAmount, initiatePayment]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setProcessing(true);

    if (!stripe || !elements) {
      setError("Stripe not loaded.");
      setProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setError("Card information not found.");
      setProcessing(false);
      return;
    }

    const { error: methodError } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (methodError) {
      setError(methodError.message || "Payment method error.");
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            email: user?.email,
            name: user?.name || "Anonymous",
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message || "Payment failed.");
      setProcessing(false);
      return;
    }

    // If payment is successful
    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      await savePayment({
        userId: user?.id,
        orderId: data?.bookingId,
        transactionId: paymentIntent.id,
        amount: totalAmount,
        paymentMethod: "stripe",
        status: "success",
        currency: "usd",
      });
      setSuccess("✅ Payment successful! Thank you.");
    } else {
      setError("Payment failed. Please try again.");
    }

    setProcessing(false);
  };

  // Handle card input validity
  const handleCardChange = (event: any) => {
    if (event.complete) {
      setCardValid(true);
    } else {
      setCardValid(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-16 p-8 bg-white rounded-3xl shadow-2xl border border-gray-100">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-3">
        Stripe Payment
      </h2>
      <p className="text-center text-lg text-gray-600 mb-6">
        You're about to pay{" "}
        <span className="font-semibold text-green-600">${totalAmount}</span>
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-inner">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#32325d",
                  fontFamily: "sans-serif",
                  "::placeholder": {
                    color: "#a0aec0",
                  },
                },
                invalid: {
                  color: "#fa755a",
                },
              },
            }}
            onChange={handleCardChange} // Check card validity on input change
          />
        </div>

        <button
          type="submit"
          disabled={!stripe || !clientSecret || processing || !cardValid} // Enable only when card is valid
          className="w-full bg-[#A20023] hover:bg-[#87001c] text-white py-3 rounded-xl font-semibold text-lg transition duration-300 disabled:opacity-50 cursor-pointer"
        >
          {processing ? "Processing..." : "Pay Now"}
        </button>

        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200 p-3 rounded-lg text-center shadow-sm">
            ❌ {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 text-green-600 border border-green-200 p-3 rounded-lg text-center shadow-sm">
            🎉 {success}
          </div>
        )}
        {transactionId && (
          <p className="text-sm text-gray-500 text-center">
            Transaction ID: <span className="font-mono">{transactionId}</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default StripePayment;
