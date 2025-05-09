import { useState } from "react";
import { useInitiatePaymentMutation } from "../../../../redux/features/payment/paymentApi";
import { useAppSelector } from "../../../../redux/features/hooks";
import { selectCurrentUser } from "../../../../redux/features/auth/authSlice";

const SSLCommerz = () => {
  const user = useAppSelector(selectCurrentUser);
  const data = JSON.parse(localStorage.getItem("paymentInfo") || "{}");
  const totalAmount = data?.totalCost || 0;

  const [initiatePayment] = useInitiatePaymentMutation();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const transactionId = `txn_${Date.now()}`;

      const res = await initiatePayment({
        paymentMethod: "sslcommerz",
        amount: Number(totalAmount),
        transactionId,
        success_url: "http://localhost:5173/dashboard/payment-history",
        fail_url: "http://localhost:5173/dashboard/payment/sslCommerz",
        cancel_url: "http://localhost:5173/dashboard/my-booking",
        cus_email: user?.email,
        cus_name: user?.name,
      }).unwrap();

      const gatewayUrl = res?.data?.GatewayPageURL;
      console.log("Payment response:", gatewayUrl);

      if (gatewayUrl) {
        window.location.href = gatewayUrl;
      } else {
        throw new Error("SSLCommerz Gateway URL missing");
      }
    } catch (error) {
      console.error("Payment initiation failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] p-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 animate-fade-in">
        <div className="flex flex-col items-center">
          <img
            src="https://sslcommerz.com/wp-content/uploads/2021/11/logo.png"
            alt="SSLCommerz"
            className="w-32 h-auto mb-4"
          />
          <h2 className="text-3xl font-bold text-[#A20023] mb-2 text-center">
            Secure Payment
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Complete your transaction using SSLCommerz. Click the button below
            to pay.
          </p>

          <div className="bg-[#fef2f2] border border-[#A20023] text-[#A20023] font-semibold text-lg rounded-xl px-6 py-3 mb-6 shadow-md">
            Total Amount: <span className="font-bold">${totalAmount}</span>
          </div>

          <button
            disabled={loading}
            onClick={handlePayment}
            className={`w-full text-center text-white font-bold py-3 px-6 rounded-xl transition duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#A20023] hover:bg-[#8e001f] cursor-pointer"
            }`}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>

          {loading && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-6">
              <div className="bg-[#A20023] h-2.5 rounded-full animate-pulse w-full"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SSLCommerz;
