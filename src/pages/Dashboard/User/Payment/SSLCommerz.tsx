// components/SSLCommerz.tsx
import { useState } from "react";
import { selectCurrentUser } from "../../../../redux/features/auth/authSlice";
import { useAppSelector } from "../../../../redux/features/hooks";
import { useSavePaymentMutation } from "../../../../redux/features/payment/paymentApi";
import { useReturnCarMutation } from "../../../../redux/features/car/carApi";

const SSLCommerz = () => {
  const user = useAppSelector(selectCurrentUser);
  const data = JSON.parse(localStorage.getItem("paymentInfo") || "{}");
  const totalAmount = data?.totalCost || 0;
  // const [createPayments] = useCreatePaymentsMutation();
  const [savePayment] = useSavePaymentMutation();
  const [returnCar] = useReturnCarMutation();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    const paymentPayload = {
      userId: user?.id,
      transactionId: `txn_${Date.now()}`,
      orderId: data?.bookingId,
      amount: Number(data?.totalCost),
      name: user?.name,
      email: user?.email,
      paymentMethod: "sslcommerz",
    };

    try {
      const res = await savePayment(paymentPayload).unwrap();
      if (res?.data) {
        window.location.replace(res.data);
      }
      const carData = {
        bookingId: data?.bookingId,
        endTime: data?.endDate,
      };
      await returnCar(carData).unwrap();
    } catch (error) {
      console.error("Error creating payment:", error);
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
            className={`w-full text-center text-white font-bold py-3 px-6 rounded-xl transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#A20023] hover:bg-[#85001a]"
            }`}
          >
            {loading ? "Processing..." : "Pay with SSLCommerz"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SSLCommerz;
