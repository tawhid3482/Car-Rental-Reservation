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
      </div>
    </div>
  );
};

export default News;
