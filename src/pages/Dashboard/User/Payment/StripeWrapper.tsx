import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripePayment from "./Stripe";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK!);

const StripeWrapper = () => {
  return (
    <div className="max-w-md mx-auto mt-10">
      <Elements stripe={stripePromise}>
        <StripePayment />
      </Elements>
    </div>
  );
};

export default StripeWrapper;
