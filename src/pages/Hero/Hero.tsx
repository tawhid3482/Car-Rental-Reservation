// import car from "../../assets/images/banner.png";

import { NavLink } from "react-router-dom";

const Hero = () => {
  return (
    <div
      style={{
        backgroundImage: `url('/src/assets/images/banner.png')`, // or use import + inline
      }}
      className="relative bg-cover bg-center h-screen w-full  bg-fixed"
    >
      {/* Background Image */}
      {/* <img
        src={car}
        alt="Car Banner"
        className="w-full h-full object-cover"
      /> */}

      {/* Overlay */}
      <div className="absolute inset-0  bg-opacity-80 backdrop-blur-xs"></div>

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10">
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 leading-tight drop-shadow-lg">
          Looking for a <span className="text-[#3DEEB7]">vehicle?</span>
          <br />
          You’re at the right place.
        </h1>

        <p className="text-gray-200 text-base md:text-lg max-w-xl mb-6">
          Discover a variety of premium cars for your next adventure. Reliable,
          fast, and always in style.
        </p>

        <NavLink to={'/booking'}>
        <button className="bg-[#3DEEB7] hover:bg-[#3DEEB7] text-[#A20023] font-semibold px-6 py-3 rounded-lg text-sm shadow-lg transition-all duration-300">
          Explore Cars
        </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Hero;
