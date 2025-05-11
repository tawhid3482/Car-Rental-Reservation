import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaCar, FaCreditCard, FaCheckCircle, FaStar } from "react-icons/fa";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { useAppSelector } from "../../../redux/features/hooks";
import { useGetUserStatQuery } from "../../../redux/features/auth/authApi";

const HomeForUser = () => {
  const user = useAppSelector(selectCurrentUser);
  const { data } = useGetUserStatQuery(user?.id ?? "");

  const statsData = data?.data;
  console.log("User Stats Data:", statsData);

  // Create array for mapping
  const info = useMemo(() => {
    if (!statsData) return [];

    return [
      {
        title: "Total Bookings",
        value: statsData.totalBookings,
        icon: <FaCar className="text-3xl text-[#A20023]" />,
      },
      {
        title: "Total Spend",
        value: `${(statsData.totalSpend).toFixed(2)}`,
        icon: <FaCreditCard className="text-3xl text-[#3DEEB7]" />,
      },
      {
        title: "Returned Cars",
        value: statsData.returnedCars,
        icon: <FaCheckCircle className="text-3xl text-green-500" />,
      },
      {
        title: "Not Returned Cars",
        value: statsData.notReturnedCars,
        icon: <FaStar className="text-3xl text-yellow-400" />,
      },
    ];
  }, [statsData]);

  useEffect(() => {
    if (user?.name) {
      toast.success(`Welcome back, ${user.name}!`, {
        position: "top-right",
      });
    }
  }, [user?.name]);

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Banner */}
      <motion.div
        className="bg-gradient-to-r from-[#A20023] to-[#3DEEB7] text-white p-6 rounded-2xl shadow-xl flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h2 className="text-3xl font-bold mb-2">
            Welcome back, {user?.name || "User"}!
          </h2>
          <p className="text-white/80">Ready for your next adventure?</p>
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="User Avatar"
          className="w-16 h-16 rounded-full object-cover"
        />
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {info.map((stat, idx) => (
          <motion.div
            key={idx}
            className="bg-white p-5 rounded-2xl shadow hover:shadow-2xl transition-all flex items-center space-x-4"
            whileHover={{ scale: 1.03 }}
          >
            <div>{stat.icon}</div>
            <div>
              <h4 className="text-gray-500 text-sm">{stat.title}</h4>
              <p className="text-2xl font-bold mt-1">
               {stat.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activities */}
      <motion.div
        className="bg-white p-6 rounded-2xl shadow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h4 className="text-lg font-bold text-[#A20023] mb-4">
          Recent Activities
        </h4>
        <ul className="space-y-4">
          <li className="flex justify-between items-center text-gray-700">
            <span>Booked a Tesla for New York trip</span>
            <span className="text-sm text-gray-400">2 days ago</span>
          </li>
          <li className="flex justify-between items-center text-gray-700">
            <span>Completed a trip to LA</span>
            <span className="text-sm text-gray-400">5 days ago</span>
          </li>
          <li className="flex justify-between items-center text-gray-700">
            <span>Left a 5-star review</span>
            <span className="text-sm text-gray-400">1 week ago</span>
          </li>
        </ul>
      </motion.div>

      {/* Upcoming Bookings */}
      <motion.div
        className="bg-white p-6 rounded-2xl shadow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h4 className="text-lg font-bold text-[#A20023] mb-4">
          Upcoming Bookings
        </h4>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-[#A20023] text-white">
              <tr>
                <th className="py-3 px-4">Vehicle</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">Tesla Model 3</td>
                <td className="py-3 px-4">May 1, 2025</td>
                <td className="py-3 px-4">New York</td>
                <td className="py-3 px-4 text-green-600 font-semibold">
                  Confirmed
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">BMW X5</td>
                <td className="py-3 px-4">May 10, 2025</td>
                <td className="py-3 px-4">Los Angeles</td>
                <td className="py-3 px-4 text-yellow-500 font-semibold">
                  Pending
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default HomeForUser;
