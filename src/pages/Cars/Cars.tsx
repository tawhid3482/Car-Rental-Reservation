import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CarCardSkeleton from "./CarCardSkeleton";
import {
  FaHeart,
  FaUser,
  FaSuitcaseRolling,
  FaDoorOpen,
  FaCarSide,
} from "react-icons/fa";

const Cars = () => {
  const [cars, setCars] = useState<{ name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      // Simulate API fetch
      setCars([{ name: "Ferrari" }, { name: "BMW" }, { name: "Lambo" }]);
      setLoading(false);
    }, 2000);
  }, []);

  const [love, setLove] = useState(false);

  const handleToggle = () => {
    setLove(!love);
  };

  return (
    <section className="my-10 px-4 md:px-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-4xl font-bold">
          Our <span className="text-[#A20023]">Vehicle</span> Fleet
        </h2>
        <p className="text-gray-600 mt-2">
          Driving your dreams to reality with an exquisite fleet of versatile{" "}
          <br className="hidden md:block" />
          vehicles for unforgettable journeys.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading
          ? [...Array(3)].map((_, i) => <CarCardSkeleton key={i} />)
          : cars.map((car, i) => (
              <motion.div
                key={i}
                className="w-full bg-[#f3eef0] rounded-2xl shadow-xl overflow-hidden p-2"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <motion.img
                  src="https://wallpapercave.com/wp/wp3425558.jpg"
                  alt={car.name}
                  className="w-full h-56 object-cover rounded-2xl border"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />

                <div className="p-4 space-y-3">
                  {/* Car name and likes */}
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">{car.name}</h3>
                    <div className="flex items-center gap-2">
                      <FaHeart
                        onClick={handleToggle}
                        className={`cursor-pointer transition-all duration-300 ${
                          love ? "text-red-600" : "text-gray-400"
                        }`}
                      />
                      <span>{love ? 1 : 0}</span>
                    </div>
                  </div>

                  {/* Car Features */}
                  <div className="flex flex-wrap items-center gap-4 text-lg">
                    <div className="flex items-center gap-1 text-[#28c76f]">
                      <FaUser />
                      <span className="text-[#00194A] font-semibold">5</span>
                    </div>

                    <div className="flex items-center gap-1 text-[#28c76f]">
                      <FaSuitcaseRolling />
                      <span className="text-[#00194A] font-semibold">2</span>
                    </div>

                    <div className="flex items-center gap-1 text-[#28c76f]">
                      <FaDoorOpen />
                      <span className="text-[#00194A] font-semibold">4</span>
                    </div>

                    <div className="flex items-center gap-1 text-[#28c76f]">
                      <FaCarSide />
                      <span className="text-[#00194A] font-bold">SUV</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-300"></div>

                  {/* Rent Details */}
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Per hour rent</p>
                      <p className="text-2xl font-bold">$250</p>
                    </div>
                    <button className="bg-[#A20023] hover:bg-[#88001c] text-white px-4 py-2 rounded-xl transition duration-300">
                      Rent Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
      </div>
    </section>
  );
};

export default Cars;
