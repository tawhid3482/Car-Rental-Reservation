import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import car from "../../assets/images/Car.png";

const Navbar = () => {
  const user = null;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            `p-2 rounded-lg ${isActive ? "bg-[#A20023] text-white" : "hover:bg-[#A20023] hover:text-white"}`
          }
          to="/about"
        >
          About us
        </NavLink>
      </li>
      <li>
        <NavLink
           className={({ isActive }) =>
            `p-2 rounded-lg ${isActive ? "bg-[#A20023] text-white" : "hover:bg-[#A20023] hover:text-white"}`
          }
          to="/booking"
        >
          Booking
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            `p-2 rounded-lg ${isActive ? "bg-[#A20023] text-white" : "hover:bg-[#A20023] hover:text-white"}`
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
          <img src={car} className="w-20 h-10" alt="" />
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-6 text-sm items-center ">
          {navOptions}
        </ul>

        {/* Right Button (e.g., Sign-in) */}
        <div className="hidden lg:block">
          {user ? (
            <button className="bg-[#A20023] text-white p-2 rounded-lg hover:bg-white hover:text-[#A20023] border border-[#A20023]">
              Logout
            </button>
          ) : (
            <button className="bg-[#A20023] text-white px-3 p-1 rounded-lg hover:bg-white hover:text-[#A20023] border border-[#A20023]">
              <NavLink to="/login">Login</NavLink>
            </button>
          )}
        </div>

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
        <ul className="lg:hidden flex flex-col gap-4 px-6 pb-4 text-sm bg-black/80 backdrop-blur-md text-white p-2 hover:text-[#A20023]">
          {navOptions}
          <button className="bg-[#A20023] text-white p-2 rounded-lg hover:bg-white hover:text-[#A20023] border border-[#A20023]">
            Sign In
          </button>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
