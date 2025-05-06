import { useGetSingleBookingQuery } from "../../../../redux/features/booking/booking";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useGetSingleBookingQuery(id);
  const [paymentMethod, setPaymentMethod] = useState(""); // ✅ Track selected payment method

  const booking = data?.data;
// console.log(booking);
  const startTime = `${booking?.date} ${booking?.startTime}`;
  const now = new Date();
  const currentDate = now.toISOString().split("T")[0];
  const currentTime = now.toTimeString().split(" ")[0];
  const endTime = `${currentDate} ${currentTime}`;

  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  const timeDifference = endDate.getTime() - startDate.getTime();
  const hoursSpent = timeDifference / (1000 * 60 * 60);
  const totalCost = (hoursSpent * booking?.car?.pricePerHour).toFixed(2);

  const handlePayBill = ({ endDate, totalCost }) => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    const paymentInfo = {
      bookingId: id,
      endDate,
      totalCost,
    };

    // ✅ Navigate based on selected payment method
    if (paymentMethod === "paypal") {
      navigate("/dashboard/payment/paypal", { state: paymentInfo });
    } else if (paymentMethod === "stripe") {
      navigate("/dashboard/payment/stripe", { state: paymentInfo });
    } else if (paymentMethod === "sslcommerz") {
      navigate("/dashboard/payment/sslcommerz", { state: paymentInfo });
    }
  };

  return (
    <div className="bg-gradient-to-r from-teal-500 to-blue-500 min-h-screen flex justify-center items-center py-10">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl flex overflow-hidden">
        {/* Left Side */}
        <div className="p-8 w-1/2">
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-700">Pay Your Bill</h2>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Select your payment method
            </h3>
            <select
              className="block w-full px-4 py-2 bg-gray-50 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)} // ✅ Update state
            >
              <option value="">Select Now</option>
              <option value="paypal">PayPal</option>
              <option value="stripe">Stripe</option>
              <option value="sslcommerz">SSLCommerz</option>
            </select>
          </div>
        </div>

        {/* Right Side */}
        <div className="bg-gray-100 p-8 w-1/2 rounded-r-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Booking Summary
          </h2>

          {booking && (
            <ul>
              <li className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <img
                    src={booking.car.image[0]}
                    alt={booking.car.name}
                    className="w-10 h-10 rounded-full mr-2 object-cover"
                  />
                  <span className="text-gray-700 text-sm">
                    {booking.car.name}
                  </span>
                </div>
                <div className="text-gray-600 text-sm">
                  <span className="font-semibold">
                    Per Hour: ${booking.car.pricePerHour}
                  </span>
                </div>
              </li>

              <li className="text-sm text-gray-700 space-y-2 mb-3">
                <p>
                  Booking Date & Time:{" "}
                  <span className="bg-green-200 p-1 rounded">
                    {startDate.toLocaleString()}
                  </span>
                </p>
                <p>
                  End Date & Time:{" "}
                  <span className="bg-[#e0ced0] p-1 rounded">
                    {endDate.toLocaleString()}
                  </span>
                </p>
                <p>
                  Time Used:{" "}
                  <span className="bg-yellow-100 p-1 rounded">
                    {hoursSpent.toFixed(2)} hours
                  </span>
                </p>
              </li>

              <li className="flex justify-between items-center mb-3 border-t-2 pt-3">
                <span className="font-semibold text-gray-700">Total</span>
                <span className="font-semibold text-gray-700">
                  ${totalCost}
                </span>
              </li>
            </ul>
          )}

          <div className="mt-4">
            <button
              onClick={() =>
                handlePayBill({
                  endDate: endDate.toISOString(),
                  totalCost,
                })
              }
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
