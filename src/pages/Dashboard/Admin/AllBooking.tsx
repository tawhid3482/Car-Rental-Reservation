import { useGetAllBookingQuery } from "../../../redux/features/booking/booking";
import { TBooking } from "../../../types/booking";

const BookingCard = () => {
  const { data, isLoading } = useGetAllBookingQuery("");

  const bookings = data?.data || [];
  console.log(bookings);

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading bookings...</p>;
  }

  return (
    <div className="space-y-6">
      {bookings.map((booking: TBooking) => {
        const { _id, user, car, date, startTime, endTime, totalCost } = booking;

        return (
          <div
            key={_id}
            className="bg-white rounded-2xl shadow-md overflow-hidden p-4 md:p-6 flex flex-col md:flex-row gap-6 transition hover:shadow-xl"
          >
            {/* User Info */}
            <div className="flex items-center gap-4 md:w-1/4">
              <img
                src={user?.image}
                alt={user?.name}
                className="w-16 h-16 rounded-full object-cover border"
              />
              <div>
                <h3 className="font-semibold text-gray-800">{user?.name}</h3>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
            </div>

            {/* Car Info */}
            <div className="flex flex-col sm:flex-row md:w-2/4 gap-4">
              <img
                src={car?.image?.[0]}
                alt={car?.name}
                className="w-full sm:w-32 h-24 rounded-lg object-cover"
              />
              <div className="flex flex-col justify-between">
                <h4 className="text-lg font-bold text-gray-800">{car?.name}</h4>
                <p className="text-sm text-gray-600">Color: {car?.color}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {car?.features?.slice(0, 3).map((feature, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Info */}
            <div className="flex flex-col justify-between md:w-1/4">
              <div>
                <p className="text-sm text-gray-500">Booking ID: {_id}</p>
                <p className="text-sm text-gray-500">Date: {date}</p>
                <p className="text-sm text-gray-500">Start: {startTime}</p>
                <p className="text-sm text-gray-500">End: {endTime}</p>
              </div>
              <div className="mt-2">
                <p className="text-lg font-bold text-[#A20023]">
                  ৳ {totalCost?.toFixed(2)}
                </p>
                {endTime ? (
                  <span className="inline-block mt-1 px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                    Paid
                  </span>
                ) : (
                  <span className="inline-block mt-1 px-3 py-1 text-xs bg-red-100 text-red-700 rounded-full">
                    Unpaid
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BookingCard;
