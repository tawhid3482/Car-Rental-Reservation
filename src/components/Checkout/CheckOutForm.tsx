/* eslint-disable @typescript-eslint/no-explicit-any */
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Backend থেকে clientSecret আনুন
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 5000 }), // amount in cents
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret));
  }, []);

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) {
      console.error("Card element not found");
      return;
    }

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.error(error);
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (confirmError) {
      console.error(confirmError);
    } else {
      console.log("Payment Successful:", paymentIntent);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className="border p-2 mb-4" />
      <button
        type="submit"
        disabled={!stripe || !clientSecret}
        className="bg-blue-600 text-white px-4 py-2"
      >
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
