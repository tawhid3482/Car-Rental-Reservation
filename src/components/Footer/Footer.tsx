const Footer = () => {
    return (
      <footer className="bg-[#752234] text-white py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo / About */}
          <div>
            <h2 className="text-xl font-semibold mb-3">MyCampers</h2>
            <p className="text-sm text-gray-400">
              Explore the great outdoors with our trusted camping gear and rentals.
            </p>
          </div>
  
          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white">Home</a></li>
              <li><a href="#" className="hover:text-white">Booking</a></li>
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
  
          {/* Contact / Socials */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Contact</h2>
            <p className="text-sm text-gray-400">Email: support@mycampers.com</p>
            <p className="text-sm text-gray-400">Phone: +1 (123) 456-7890</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-white">🌐</a>
              <a href="#" className="hover:text-white">🐦</a>
              <a href="#" className="hover:text-white">📸</a>
            </div>
          </div>
        </div>
  
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} MyCampers. All rights reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  