import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import car from "../../assets/images/Car.png";

import {
  FaBars,
  FaTachometerAlt,
  FaListAlt,
  FaCommentDots,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaMoneyBill,
  FaHome,
  FaBook,
  FaPhone,
} from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../redux/features/hooks";
import { logout, selectCurrentUser } from "../../redux/features/auth/authSlice";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 p-2 rounded-md transition duration-300 hover:bg-[#A20023] ${
      isActive ? "bg-[#A20023] font-semibold" : ""
    }`;

    const handleLogout = () => {
      dispatch(logout());
      navigate('/')
    };
  



  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white w-64 flex-shrink-0 p-4 flex-col justify-between fixed md:static z-40 transition-transform duration-300 h-screen overflow-y-auto ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img src={car} alt="Logo" className="w-20 h-20 rounded-full mb-2" />
          <p className="text-lg font-bold">Dashboard</p>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-2">
          {user?.role === "user" ? (
            <>
              <NavLink to="/dashboard/home" className={linkClass}>
                <FaTachometerAlt /> Dashboard Home
              </NavLink>
              <NavLink to="/dashboard/my-booking" className={linkClass}>
                <FaListAlt /> My Booking
              </NavLink>
              <NavLink to="/dashboard/payment-history" className={linkClass}>
                <FaMoneyBill /> Payment History
              </NavLink>
              <NavLink to="/dashboard/messaging" className={linkClass}>
                <FaCommentDots /> Message
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/dashboard/admin-home" className={linkClass}>
                <FaTachometerAlt /> Admin Home
              </NavLink>
              <NavLink to="/dashboard/all-booking" className={linkClass}>
                <FaListAlt /> All Booking
              </NavLink>
              <NavLink to="/dashboard/all-cars" className={linkClass}>
                <FaMoneyBill /> Add Cars
              </NavLink>
              <NavLink to="/dashboard/manage-cars" className={linkClass}>
                <FaCommentDots /> Manage Cars
              </NavLink>
              <NavLink to="/dashboard/admin-messaging" className={linkClass}>
                <FaCommentDots /> Message
              </NavLink>
            </>
          )}

          <hr className="border-t border-gray-600 my-4" />

          {/* Common Links */}
          <NavLink to="/" className={linkClass}>
            <FaHome /> Home
          </NavLink>
          <NavLink to="/booking" className={linkClass}>
            <FaBook /> Booking
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            <FaPhone /> Contact
          </NavLink>
        </nav>

        {/* Bottom Links */}
        <div className="mt-6 border-t border-gray-600 pt-4">
          <NavLink to="/dashboard/profile" className={linkClass}>
            <FaUser /> Profile
          </NavLink>
          <NavLink to="/dashboard/settings" className={linkClass}>
            <FaCog /> Settings
          </NavLink>

          <div className="flex items-center gap-3 hover:bg-[#A20023] rounded-lg  p-2">
          <FaSignOutAlt />
          <button className=" cursor-pointer "  onClick={handleLogout} >
            Logout
          </button>
          </div>
        
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto bg-gray-100 ml-64 md:ml-0">
    {/* Topbar for mobile */}
    <div className="md:hidden flex items-center justify-between p-4 bg-white shadow-md">
      <button onClick={toggleSidebar}>
        <FaBars size={24} />
      </button>
      <h1 className="text-xl font-bold text-[#A20023]">Dashboard</h1>
    </div>

    <div className="p-4">
      <Outlet />
    </div>
  </div>
    </div>
  );
};

export default Dashboard;
