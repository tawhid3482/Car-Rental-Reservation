const News = () => {
  return (
    <div className="p-2">
      <div className="text-center my-5">
        <span className="text-[#3DEEB7] text-lg px-2 rounded-lg bg-[#93848a]">
          Latest From Us
        </span>
        <h2 className="text-2xl font-bold md:text-4xl">
          News <span className="text-[#A20023]"> &</span> Promo
        </h2>
        <p className="text-gray-600 mt-2">
          Breaking news, fresh perspectives, and in-depth coverage - <br /> stay
          ahead with our latest news, insights, and analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-[#f3eef0]r">
          {/* Image Section */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1508780709619-79562169bc64"
              alt="Backpacker"
              className="w-full h-56 object-cover transition-transform duration-500 hover:scale-105"
            />
            {/* Date Badge */}
            <div className="absolute top-4 left-4 bg-[#A20023] text-white px-3 py-2 rounded-lg text-center">
              <p className="text-xl font-bold leading-tight">14</p>
              <p className="text-xs tracking-widest">MAR</p>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-5">
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              Holiday Tips For Backpacker
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              For adventure seekers and budget-conscious travelers, backpacking
              offers a thrilling and immersive way to explore the world. Whether
              you're embarking..
            </p>

            {/* Read More Button */}
            <button className="bg-[#A20023] hover:bg-[#3DEEB7] text-white font-semibold py-2 px-4 rounded-md text-sm">
              Read More
            </button>
          </div>
        </div>

        <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-[#f3eef0]">
          {/* Image Section */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
              alt="Camping Tent"
              className="w-full h-56 object-cover transition-transform duration-500 hover:scale-105"
            />
            {/* Date Badge */}
            <div className="absolute top-4 left-4 bg-[#A20023] text-white px-3 py-2 rounded-lg text-center">
              <p className="text-xl font-bold leading-tight">08</p>
              <p className="text-xs tracking-widest">APR</p>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-5">
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              Best Camping Spots This Year
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Discover the most breathtaking camping locations to reconnect with
              nature. Pack your gear and get ready for an unforgettable outdoor
              adventure!
            </p>
            <button className="bg-[#A20023] hover:bg-[#3DEEB7] text-white font-semibold py-2 px-4 rounded-md text-sm">
              Read More
            </button>
          </div>
        </div>
        
        <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-[#f3eef0]">
          {/* Image Section */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
              alt="Beach Trip"
              className="w-full h-56 object-cover transition-transform duration-500 hover:scale-105"
            />
            {/* Date Badge */}
            <div className="absolute top-4 left-4 bg-[#A20023] text-white px-3 py-2 rounded-lg text-center">
              <p className="text-xl font-bold leading-tight">22</p>
              <p className="text-xs tracking-widest">MAY</p>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-5">
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              Essential Gear for Beach Trips
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Planning a sunny beach trip? Make sure you pack these must-have
              essentials to stay safe, comfortable, and stylish while soaking up
              the sun.
            </p>
            <button className="bg-[#A20023] hover:bg-[#3DEEB7] text-white font-semibold py-2 px-4 rounded-md text-sm">
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
