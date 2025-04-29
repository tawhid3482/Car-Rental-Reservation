import { useGetUserBookingByEmailQuery } from "../../../redux/features/booking/booking";
import { useAppSelector } from "../../../redux/features/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { TBooking } from "../../../types/booking";
import { Link } from "react-router-dom";

const MyBooking = () => {
  const user = useAppSelector(selectCurrentUser);
  const { data, isLoading } = useGetUserBookingByEmailQuery(user?.email);
  const bookings = data?.data || [];

  if (isLoading)
    return (
      <p className="text-center mt-10 text-lg text-[#A20023]">Loading...</p>
    );

  return (
    <div className="p-5 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold mb-8 text-center text-[#A20023]">
        My Bookings
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No bookings found.</p>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking: TBooking) => (
            <div
              key={booking._id}
              className="bg-white rounded-xl shadow-lg p-5 grid grid-cols-1 md:grid-cols-3 gap-4 border border-[#A20023]"
            >
              {/* Image Section */}
              <div className="col-span-1">
                <img
                  src={booking.car?.image[0]}
                  alt={booking.car?.name}
                  className="w-full h-44 object-cover rounded-md"
                />
              </div>

              {/* Details Section */}
              <div className="col-span-2 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold mb-2 text-[#A20023]">
                    {booking.car?.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Type: {booking.car?.type}
                  </p>
                  <p className="text-sm text-gray-600">
                    Color: {booking.car?.color}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Date:{" "}
                    <span className="text-[#3DEEB7] font-medium">
                      {booking.date}
                    </span>{" "}
                    | Start-Time: {booking.startTime}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    End-Time: {booking.endTime ? booking.endTime : "null"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Total Cost:{" "}
                    <span className="font-medium text-[#3DEEB7]">
                      ${booking.totalCost}
                    </span>
                  </p>
                  {booking.endTime ? (
                    <p className="text-sm text-green-600 mt-2">
                      ✅ Already Returned
                    </p>
                  ) : (
                    <Link to={`/dashboard/payment/${booking._id}`}>
                      <button className="mt-3 px-4 py-2 bg-[#A20023] text-white text-sm rounded cursor-pointer hover:bg-[#87001b] transition">
                        Return Now
                      </button>
                    </Link>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {booking.car?.features?.map(
                    (feature: string, index: number) => (
                      <span
                        key={index}
                        className="bg-[#3DEEB7]/20 text-black text-xs px-3 py-1 rounded-lg"
                      >
                        {feature}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooking;
