import { useEffect } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaDollarSign, FaEnvelope, FaHourglassHalf } from "react-icons/fa";
import { useAppSelector } from "../../../redux/features/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";

const HomeForUser = () => {
  const user = useAppSelector(selectCurrentUser);

  useEffect(() => {
    toast.success(`Welcome back, ${user?.name || "User"}!`, {
      duration: 3000,
      position: "top-right",
    });
  }, [user?.name]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] py-12 px-4">
      <p className="text-center text-4xl font-bold text-[#A20023] mb-10">
        Welcome To Dashboard
      </p>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-7xl mx-auto bg-white/30 backdrop-blur-md shadow-2xl rounded-3xl p-10 border border-white/40"
      >
        <h2 className="text-3xl font-bold text-[#A20023] mb-2">
          Dashboard Overview
        </h2>
        <p className="text-gray-700 mb-6">
          Monitor and manage all your activities quickly and efficiently.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/40 backdrop-blur-lg border border-white/30 rounded-xl p-6 shadow-md text-center"
          >
            <FaCalendarAlt size={32} className="mx-auto text-[#A20023] mb-2" />
            <h3 className="text-2xl font-bold">3</h3>
            <p className="text-gray-600">Bookings</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/40 backdrop-blur-lg border border-white/30 rounded-xl p-6 shadow-md text-center"
          >
            <FaDollarSign size={32} className="mx-auto text-green-600 mb-2" />
            <h3 className="text-2xl font-bold">$120</h3>
            <p className="text-gray-600">Total Spend</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/40 backdrop-blur-lg border border-white/30 rounded-xl p-6 shadow-md text-center"
          >
            <FaEnvelope size={32} className="mx-auto text-blue-500 mb-2" />
            <h3 className="text-2xl font-bold">2</h3>
            <p className="text-gray-600">Messages</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/40 backdrop-blur-lg border border-white/30 rounded-xl p-6 shadow-md text-center"
          >
            <FaHourglassHalf size={32} className="mx-auto text-yellow-600 mb-2" />
            <h3 className="text-2xl font-bold">1</h3>
            <p className="text-gray-600">Pending</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HomeForUser;
