
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import car from "../../assets/images/Car.png";
import { useAppDispatch, useAppSelector } from "../../redux/features/hooks";
import { logout, selectCurrentUser } from "../../redux/features/auth/authSlice";

const Navbar = () => {
  const user = useAppSelector(selectCurrentUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  // console.log(user)

  const handleLogout = () => {
    dispatch(logout());
  };

  const navOptions = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            `p-2 rounded-lg ${
              isActive
                ? "bg-[#A20023] text-white"
                : "hover:bg-[#A20023] hover:text-white"
            }`
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            `p-2 rounded-lg ${
              isActive
                ? "bg-[#A20023] text-white"
                : "hover:bg-[#A20023] hover:text-white"
            }`
          }
          to="/about"
        >
          About us
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            `p-2 rounded-lg ${
              isActive
                ? "bg-[#A20023] text-white"
                : "hover:bg-[#A20023] hover:text-white"
            }`
          }
          to="/booking"
        >
          Booking
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            `p-2 rounded-lg ${
              isActive
                ? "bg-[#A20023] text-white"
                : "hover:bg-[#A20023] hover:text-white"
            }`
          }
          to="/contact"
        >
          Contact
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/cart"
          className="relative inline-flex items-center hover:bg-[#A20023] p-2 rounded-lg hover:text-white"
        >
          <FaShoppingCart className="text-lg" />
          <span className="ml-1 text-sm">Cart</span>
          <span className="absolute -top-2 -right-3 bg-red-600 text-white rounded-full px-1.5 text-xs">
            {/* {cart.length} */}
          </span>
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="fixed w-full z-50 text-black backdrop-blur-md bg-white/10 shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold tracking-wide">
          <img src={car} className="w-20 h-10" alt="Logo" />
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-6 text-sm items-center">{navOptions}</ul>

        {/* User Dropdown - Desktop */}
        {user  ? (
          <div className="relative hidden lg:block">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none "
            >
              <img
                src={user?.image || "https://i.ibb.co/ZmFHZDM/user.png"}
                alt="user"
                className="w-10 h-10 rounded-full border border-gray-300 object-cover cursor-pointer"
              />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="px-4 py-2 text-sm text-gray-700">
                  👤 {user?.email}
                </div>
                <NavLink
                  to="/dashboard"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden lg:block">
            <NavLink to="/login">
              <button className="bg-[#A20023] text-white px-3 p-1 rounded-lg hover:bg-white hover:text-[#A20023] border border-[#A20023]">
                Login
              </button>
            </NavLink>
          </div>
        )}

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <ul className="lg:hidden flex flex-col gap-4 px-6 pb-4 text-sm bg-black/80 backdrop-blur-md text-white p-2">
          {navOptions}
          {user && user.email ? (
            <>
              <div className="flex items-center gap-2">
                <img
                  src={user?.image || "https://i.ibb.co/ZmFHZDM/user.png"}
                  alt="user"
                  className="w-8 h-8 rounded-full border border-gray-300 object-cover"
                />
                <span>{user.email}</span>
              </div>
              <NavLink
                to="/dashboard"
                className="text-white hover:text-[#A20023]"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </NavLink>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="text-left px-4 py-2 text-red-400 hover:text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login">
              <button className="bg-[#A20023] text-white p-2 rounded-lg hover:bg-white hover:text-[#A20023] border border-[#A20023]">
                Login
              </button>
            </NavLink>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
