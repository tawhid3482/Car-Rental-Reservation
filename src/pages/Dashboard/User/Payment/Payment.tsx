import { useGetSingleBookingQuery } from "../../../../redux/features/booking/booking";
import { useParams } from "react-router-dom";

const Payment = () => {
  const { id } = useParams();
  const { data } = useGetSingleBookingQuery(id);

  const booking = data?.data; // Single booking object

  /// ✅ Start Time: combine date and startTime
  const startTime = `${booking?.date} ${booking?.startTime}`; // e.g. "2025-04-30 16:37"

  // ✅ End Time: current date and time
  const now = new Date();
  const currentDate = now.toISOString().split("T")[0]; // e.g. "2025-04-30"
  const currentTime = now.toTimeString().split(" ")[0]; // e.g. "14:55:30"
  const endTime = `${currentDate} ${currentTime}`; // e.g. "2025-04-30 14:55:30"

  // ✅ Convert to Date objects
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  // ✅ Calculate the difference in milliseconds
  const timeDifference = endDate.getTime() - startDate.getTime();
  // ✅ Convert milliseconds to hours
  const hoursSpent = timeDifference / (1000 * 60 * 60);
  const totalCost = (hoursSpent * booking?.car?.pricePerHour).toFixed(2);

  const handlePayBill = (paymentData) => {
    console.log("End Date:", paymentData.endDate);
    console.log("Total Cost:", paymentData.totalCost);
    // You can send this data to your backend here if needed
  };

  return (
    <div className="bg-gradient-to-r from-teal-500 to-blue-500 min-h-screen flex justify-center items-center py-10">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl flex overflow-hidden">
        {/* Left Side: Payment Details */}
        <div className="p-8 w-1/2">
          {/* Header */}
          <div className="flex items-center mb-6">
            <button className="text-gray-600 hover:text-gray-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h2 className="text-2xl font-semibold text-gray-700">
              Pay Your Bill
            </h2>
          </div>

          {/* Payment Methods */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Select your payment method
            </h3>
            <select
              className="block w-full px-4 py-2 bg-gray-50 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              name="paymentMethod"
              id="paymentMethod"
            >
              <option value="">Select Now</option>
              <option value="paypal">PayPal</option>
              <option value="stripe">Stripe</option>
              <option value="sslcommerz">SSLCommerz</option>
            </select>
          </div>
        </div>

        {/* Right Side: Order Summary */}
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

              {/* Booking Date and Start Time */}
              <li className="flex flex-col space-y-2 text-sm text-gray-700 mb-3">
                <span className="mt-1">
                  Booking Date & Time:{" "}
                  <span className="bg-green-200 p-1 rounded">
                    {startDate.toLocaleString()}
                  </span>
                </span>

                <span className="mt-1">
                  End Date & Time:{" "}
                  <span className="bg-[#e0ced0] p-1 rounded">
                    {endDate.toLocaleString()}
                  </span>
                </span>

                <span className="mt-1">
                  Time Used:{" "}
                  <span className="bg-yellow-100 p-1 rounded">
                    {hoursSpent.toFixed(2)} hours
                  </span>
                </span>
              </li>

              {/* Total Section */}
              <li className="flex justify-between items-center mb-3 border-t-2 pt-3">
                <span className="font-semibold text-gray-700">Total</span>
                <span className="font-semibold text-gray-700">
                  ${totalCost}
                </span>
              </li>
            </ul>
          )}

          {/* Pay Now Button */}
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
