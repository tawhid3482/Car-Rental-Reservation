const BusinessInfo = () => {
    const stats = [
      { label: "Completed Orders", value: 15425 },
      { label: "Happy Customers", value: 8745 },
      { label: "Vehicles Fleet", value: 235 },
      { label: "Years Experience", value: 15 },
    ];
  
    return (
      <section
        className="relative bg-cover bg-center text-gray-300 rounded-2xl overflow-hidden  bg-fixed"
        style={{
          backgroundImage:
            "url('https://www.shutterstock.com/image-photo/new-cars-showroom-show-waiting-600nw-2324775585.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0  bg-gradient-to-b from-black/80 via-black/70 to-black/60 backdrop-blur-sm"></div>
  
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          {/* Info Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
                We offer a wide range of 
                <span className="text-[#A20023]">commercial</span> &{" "}
                <span className="text-[#A20023]">luxury cars</span> for any occasion.
              </h2>
            </div>
  
            <div className="text-gray-300 text-base md:text-lg leading-relaxed space-y-4">
              <p>
                Our car rental agency is committed to offering reliable and
                comfortable vehicles for every budget.
              </p>
              <p>
                From sleek sedans to spacious SUVs, our curated fleet ensures
                comfort, style, and performance. With an easy booking process and
                flexible rental options, we’re here for your every journey —
                business or leisure.
              </p>
            </div>
          </div>
  
          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((item) => (
              <div
                key={item.label}
                className="bg-black bg-opacity-10 backdrop-blur-md border border-white/10 text-center rounded-xl p-6 hover:scale-105 transition duration-300 shadow-lg"
              >
                <div className="text-4xl font-bold text-[#3DEEB7]">
                  {item.value.toLocaleString()}
                </div>
                <div className="mt-2 text-sm text-white ">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default BusinessInfo;
  