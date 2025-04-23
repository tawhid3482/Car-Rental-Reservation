import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { FaCarSide, FaShuttleVan, FaBusAlt } from "react-icons/fa";
import { IoCarSport } from "react-icons/io5";
import { motion } from "framer-motion";

import { FaUser, FaSuitcaseRolling, FaDoorOpen } from "react-icons/fa";
// import CarCardSkeleton from "../Cars/CarCardSkeleton";

type Inputs = {
  vehicle: string;
  pickUpLocation: string;
  dropOffLocation: string;
  pickUpDate: string;
  pickUpTime: string;
  returnOffDate: string;
  returnOffTime: string;
};

const vehicleTypes = [
  { type: "Car", icon: <FaCarSide size={30} /> },
  { type: "Van", icon: <FaShuttleVan size={30} /> },
  { type: "Minibus", icon: <FaBusAlt size={30} /> },
  { type: "Super-Car", icon: <IoCarSport size={30} /> },
];

const availableVehicles = [
  {
    id: 1,
    type: "Car",
    name: "Ferrari",
    img: "https://wallpapercave.com/wp/wp3425558.jpg",
    price: "250",
    pickUpLocation: "Dhaka",
    dropOffLocation: "Chittagong",
  },
  {
    id: 2,
    type: "Van",
    img: "https://wallpapercave.com/wp/wp3425558.jpg",
    price: "200",
    pickUpLocation: "Sylhet",
    dropOffLocation: "Dhaka",
  },
  {
    id: 3,
    type: "Super-Car",
    img: "https://wallpapercave.com/wp/wp3425558.jpg",
    price: "500",
    pickUpLocation: "Dhaka",
    dropOffLocation: "Khulna",
  },
];

const Pickup = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");
  const [matchedVehicles, setMatchedVehicles] = useState<
    typeof availableVehicles
  >([]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const matches = availableVehicles.filter(
      (vehicle) =>
        vehicle.type === data.vehicle &&
        vehicle.pickUpLocation.toLowerCase() ===
          data.pickUpLocation.toLowerCase() &&
        vehicle.dropOffLocation.toLowerCase() ===
          data.dropOffLocation.toLowerCase()
    );
    setMatchedVehicles(matches);
  };

  return (
    <div className="my-8 border p-4 md:p-6 rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
          {/* Vehicle Selection */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              What is your vehicle type?
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
              {vehicleTypes.map(({ type, icon }) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    setSelectedVehicle(type);
                    setValue("vehicle", type);
                  }}
                  className={`flex flex-col items-center gap-1 p-4 rounded-lg text-white transition-colors ${
                    selectedVehicle === type ? "bg-[#3DEEB7]" : "bg-[#A20023]"
                  }`}
                >
                  <div>{icon}</div>
                  <span className="text-sm sm:text-base">{type}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Location & Date Time */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-700">Pick Up Location</label>
                <input
                  {...register("pickUpLocation", { required: true })}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter pickup location"
                />
                {errors.pickUpLocation && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>
              <div>
                <label className="block text-gray-700">Drop Off Location</label>
                <input
                  {...register("dropOffLocation", { required: true })}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter dropoff location"
                />
                {errors.dropOffLocation && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-700">
                  Pick Up Date & Time
                </label>
                <input
                  {...register("pickUpDate", { required: true })}
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <input
                  {...register("pickUpTime", { required: true })}
                  type="time"
                  className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                />
              </div>
              <div>
                <label className="block text-gray-700">
                  Return Date & Time
                </label>
                <input
                  {...register("returnOffDate", { required: true })}
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <input
                  {...register("returnOffTime", { required: true })}
                  type="time"
                  className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                />
              </div>
            </div>
          </div>
        </div>

        <input type="hidden" {...register("vehicle", { required: true })} />
        {errors.vehicle && (
          <p className="text-red-500 text-sm mb-4">
            Please select a vehicle type
          </p>
        )}

        <button
          type="submit"
          className="bg-[#A20023] text-white p-4 rounded-lg w-full"
        >
          Find a Vehicle
        </button>
      </form>

      {/* Show Matched Vehicles */}
      {matchedVehicles.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Available Vehicles:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {matchedVehicles.map((vehicle) => (
              <motion.div
                key={vehicle.id}
                className="w-full bg-[#f3eef0] rounded-2xl shadow-xl overflow-hidden p-2"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <motion.img
                  src={vehicle.img}
                  alt={vehicle.type}
                  className="w-full h-56 object-cover rounded-2xl border"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />

                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">{vehicle.name}</h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-lg">
                    <div className="flex items-center gap-1 text-[#28c76f]">
                      <FaUser />
                      <span className="text-[#00194A] font-semibold">4</span>
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
                      <span className="text-[#00194A] font-bold">
                        {vehicle.type}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-300"></div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Per hour rent</p>
                      <p className="text-2xl font-bold">${vehicle.price}</p>
                    </div>
                    <button className="bg-[#A20023] hover:bg-[#88001c] text-white px-4 py-2 rounded-xl transition duration-300">
                      Rent Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {matchedVehicles.length === 0 && selectedVehicle && (
        <p className="text-red-500 mt-4">No vehicles matched your search.</p>
      )}
    </div>
  );
};

export default Pickup;
